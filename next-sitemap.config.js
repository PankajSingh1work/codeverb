/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://codeverb.in', // Replace with your actual domain
    generateRobotsTxt: true, // Generates a robots.txt file alongside the sitemap
    exclude: ['/admin/**', '/404', '/server-sitemap.xml'], // Exclude admin routes, 404 page, and dynamic sitemap path
    sitemapSize: 7000, // Number of URLs per sitemap file (default is 7000, Google’s limit)
    // Optionally, transform dynamic routes or add custom properties
    transform: async (config, path) => {
      // Exclude any paths starting with /admin (already handled by `exclude`, but for clarity)
      if (path.startsWith('/admin')) {
        return null;
      }
  
      // Optionally fetch lastmod from Firebase for dynamic routes (e.g., projects/certificates)
      let lastmod = new Date().toISOString(); // Default to current date
      if (path.startsWith('/project/') || path.startsWith('/certificate/')) {
        try {
          const slug = path.split('/')[2]; // Extract slug from /project/[slug]/index or /certificate/[slug]/index
          const db = require('./src/lib/firebase').database; // Import Firebase database from lib/firebase.js
          const { get, ref } = require('firebase/database');
  
          // Determine if it's a project or certificate and fetch the last updated timestamp
          let dataPath;
          if (path.startsWith('/project/')) {
            dataPath = `projectspage/projects_list/${slug.replace(/-/g, ' ')}`; // Convert hyphenated slug back to title
          } else {
            dataPath = `certificatespage/certificates_list/${slug.replace(/-/g, ' ')}`; // Convert hyphenated slug back to title
          }
  
          const itemRef = ref(db, dataPath);
          const snapshot = await get(itemRef);
          const itemData = snapshot.val();
  
          if (itemData && itemData.lastUpdated) { // Assuming you have a lastUpdated field in Firebase
            lastmod = new Date(itemData.lastUpdated).toISOString();
          }
        } catch (error) {
          console.error('Error fetching lastmod for path:', path, error);
          // Fall back to current date if there's an error
        }
      }
  
      return {
        loc: path, // The URL path
        changefreq: 'weekly', // How frequently the page is likely to change
        priority: path === '/' ? '1.0' : '0.8', // Higher priority for homepage
        lastmod: lastmod, // Use the fetched or default last modified date
      };
    },
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*', // Apply to all user agents
          allow: ['/'], // Allow crawling of all public pages (default behavior)
          disallow: ['/admin/'], // Disallow crawling of admin routes
        },
      ],
      additionalSitemaps: [
        'https://codeverb.in/sitemap.xml', // Static sitemap
        'https://codeverb.in/server-sitemap.xml', // Dynamic sitemap for projects/certificates
      ],
    },
  };