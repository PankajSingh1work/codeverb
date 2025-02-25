// app/server-sitemap.xml/route.ts
import { getServerSideSitemap } from 'next-sitemap';
import { fetchProjects, fetchCertificates } from '../../lib/sitemapUtils'; // Adjust the import path

export async function GET(request) {
  try {
    const projects = await fetchProjects(); // Fetch all project data from Firebase
    const certificates = await fetchCertificates(); // Fetch all certificate data from Firebase

    const projectFields = Object.values(projects).map((project) => ({
      loc: `https://codeverb.in/project/${project.hero.title.toLowerCase().replace(/\s+/g, '-')}/index`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7',
    }));

    const certificateFields = Object.values(certificates).map((certificate) => ({
      loc: `https://codeverb.in/certificate/${certificate.hero.title.toLowerCase().replace(/\s+/g, '-')}/index`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7',
    }));

    const fields = [...projectFields, ...certificateFields];

    return getServerSideSitemap(fields);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw new Error('Failed to generate sitemap');
  }
}

