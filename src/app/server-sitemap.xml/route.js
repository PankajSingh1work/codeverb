// app/server-sitemap.xml/route.ts
import { getServerSideSitemap } from 'next-sitemap';
import { fetchProjects, fetchCertificates } from '../../lib/sitemapUtils';

export async function GET(request) {
  try {
    const projects = await fetchProjects(); // Returns array of projects
    const certificates = await fetchCertificates(); // Returns array of certificates

    const projectFields = projects.map((project, index) => ({
      loc: `https://codeverb.in/project/${project.hero.title.toLowerCase().replace(/\s+/g, '-')}/${index}`,
      lastmod: project.lastUpdated ? new Date(project.lastUpdated).toISOString() : new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7',
    }));

    const certificateFields = certificates.map((certificate, index) => ({
      loc: `https://codeverb.in/certificate/${certificate.hero.title.toLowerCase().replace(/\s+/g, '-')}/${index}`,
      lastmod: certificate.lastUpdated ? new Date(certificate.lastUpdated).toISOString() : new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7',
    }));

    const fields = [...projectFields, ...certificateFields];

    return getServerSideSitemap(fields, {
      headers: {
        'X-Robots-Tag': 'noindex', // Prevent indexing of this sitemap
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw new Error('Failed to generate sitemap');
  }
}