/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://codeverb.in',
  generateRobotsTxt: true,
  exclude: ['/admin/**', '/404', '/server-sitemap.xml'],
  sitemapSize: 7000,

  transform: async (config, path) => {
    if (path.startsWith('/admin') || path === '/server-sitemap.xml') {
      return null;
    }
    return {
      loc: path,
      changefreq: 'weekly',
      priority: path === '/' ? '1.0' : '0.8',
      lastmod: new Date().toISOString(),
    };
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
    ],
    additionalSitemaps: ['https://codeverb.in/server-sitemap.xml'],
  },

  generateIndexSitemap: false,
};