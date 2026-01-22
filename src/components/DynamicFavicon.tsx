import { useEffect } from 'react';

interface DynamicFaviconProps {
  isDarkMode: boolean;
}

/**
 * DynamicFavicon component that switches favicon based on theme
 * Updates favicon, apple-touch-icon, manifest, and theme colors dynamically
 */
export function DynamicFavicon({ isDarkMode }: DynamicFaviconProps) {
  useEffect(() => {
    const themeFolder = isDarkMode ? 'favicon_io_dark' : 'favicon_io_light';
    const themeColor = isDarkMode ? '#000000' : '#ffffff';
    
    // Update favicon links
    const favicon16 = document.querySelector('link[rel="icon"][sizes="16x16"]') as HTMLLinkElement;
    const favicon32 = document.querySelector('link[rel="icon"][sizes="32x32"]') as HTMLLinkElement;
    const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
    const manifest = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
    
    if (favicon16) {
      favicon16.href = `/${themeFolder}/favicon-16x16.jpg`;
    }
    
    if (favicon32) {
      favicon32.href = `/${themeFolder}/favicon-32x32.jpg`;
    }
    
    if (appleTouchIcon) {
      appleTouchIcon.href = `/${themeFolder}/apple-touch-icon.jpg`;
    }
    
    if (manifest) {
      manifest.href = `/${themeFolder}/site.webmanifest`;
    }
    
    // Update main favicon.ico for browsers that cache it
    const mainFavicon = document.querySelector('link[rel="icon"][type="image/x-icon"]') as HTMLLinkElement;
    if (mainFavicon) {
      mainFavicon.href = `/${themeFolder}/favicon.ico`;
    }
    
    // Update theme color meta tags
    const themeColorMeta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement;
    const msApplicationTileColor = document.querySelector('meta[name="msapplication-TileColor"]') as HTMLMetaElement;
    
    if (themeColorMeta) {
      themeColorMeta.content = themeColor;
    }
    
    if (msApplicationTileColor) {
      msApplicationTileColor.content = themeColor;
    }
    
    // Update apple mobile web app status bar style
    const appleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]') as HTMLMetaElement;
    if (appleStatusBar) {
      appleStatusBar.content = isDarkMode ? 'black-translucent' : 'default';
    }
    
  }, [isDarkMode]);

  return null;
}