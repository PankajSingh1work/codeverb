// middleware.js
const { NextResponse } = require('next/server');

function middleware(request) {
  const url = request.nextUrl.pathname;
  // Match any .xml file (sitemaps) and robots.txt
  if (url.endsWith('.xml') || url === '/robots.txt') {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex');
    return response;
  }
  return NextResponse.next();
}

module.exports = {
  middleware,
  config: {
    matcher: ['/:path*.xml', '/robots.txt'], // Matches sitemap.xml, sitemap-0.xml, server-sitemap.xml, etc.
  },
};