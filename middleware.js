// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.pathname;
  if (url.endsWith('.xml') || url === '/robots.txt') {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex');
    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*.xml', '/robots.txt'],
};