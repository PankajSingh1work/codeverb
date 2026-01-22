import projectsData from '../lib/projects.json';
import certificationsData from '../lib/certifications.json';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export function generateSitemap(): string {
  const baseUrl = 'https://www.codeverb.in';
  const currentDate = new Date().toISOString().split('T')[0];

  const urls: SitemapUrl[] = [
    // Static pages
    {
      loc: baseUrl,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${baseUrl}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/services`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      loc: `${baseUrl}/projects`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${baseUrl}/certifications`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${baseUrl}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.6
    }
  ];

  // Add project pages with SEO-friendly URLs
  projectsData.projects.forEach(project => {
    const slug = project.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
      
    urls.push({
      loc: `${baseUrl}/project/${project.id}/${slug}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    });
  });

  // Add certification pages with SEO-friendly URLs
  certificationsData.certifications.forEach(cert => {
    const slug = cert.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
      
    urls.push({
      loc: `${baseUrl}/certification/${cert.id}/${slug}`,
      lastmod: currentDate,
      changefreq: 'yearly',
      priority: 0.5
    });
  });

  // Generate XML
  const xmlUrls = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlUrls}
</urlset>`;
}

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: https://www.codeverb.in/sitemap.xml`;
}