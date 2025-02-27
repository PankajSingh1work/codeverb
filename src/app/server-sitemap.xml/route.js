// src/app/server-sitemap.xml/route.ts
import { getServerSideSitemap } from 'next-sitemap';
import { fetchProjects, fetchCertificates } from '../../lib/sitemapUtils';

// Reusable slug generation function (consistent with your pages)
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function GET() {
  try {
    const projects = await fetchProjects();
    const certificates = await fetchCertificates();

    const projectFields = projects.map((project, index) => ({
      loc: `https://codeverb.in/project/${generateSlug(project.hero.title || 'project')}/${index}`,
      lastmod: project.lastUpdated ? new Date(project.lastUpdated).toISOString() : new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7',
    }));

    const certificateFields = certificates.map((certificate, index) => ({
      loc: `https://codeverb.in/certificate/${generateSlug(certificate.hero.title || 'certificate')}/${index}`,
      lastmod: certificate.lastUpdated ? new Date(certificate.lastUpdated).toISOString() : new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.7',
    }));

    const fields = [...projectFields, ...certificateFields];

    return getServerSideSitemap(fields, {
      headers: {
        'X-Robots-Tag': 'noindex',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error.message, { stack: error.stack });
    // Fallback to empty sitemap on error to prevent 500
    return getServerSideSitemap([], {
      headers: {
        'X-Robots-Tag': 'noindex',
      },
    });
  }
}