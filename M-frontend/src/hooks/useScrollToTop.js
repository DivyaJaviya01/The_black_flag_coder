import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that scrolls to the top of the page whenever the route changes
 * This ensures that when users navigate to a new page, they start at the top
 */
export default function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top of the page when route changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}