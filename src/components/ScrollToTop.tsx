import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that automatically scrolls to top on route changes
 * This ensures that when navigating to a new page, the user starts at the top
 * Also manages focus for better accessibility
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if this is a detail page navigation (project or certification)
    const isDetailPage = pathname.includes('/project/') || pathname.includes('/certification/');
    
    if (isDetailPage) {
      // For detail pages, scroll immediately to ensure user sees the top
      window.scrollTo(0, 0);
      
      // Focus on the main content for screen readers
      setTimeout(() => {
        const mainElement = document.querySelector('main');
        if (mainElement) {
          mainElement.focus();
        }
      }, 100);
    } else {
      // For other pages, use smooth scroll
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, [pathname]);

  return null;
}