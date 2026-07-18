import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVirtualPageView } from '../lib/analytics';

/**
 * Listens for SPA route changes and pushes a `virtual_page_view` event to the
 * GTM dataLayer so GA4 records accurate pageview metrics for client-side
 * navigation. Mounted once inside <BrowserRouter />.
 */
export default function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search + location.hash;
    const title = document.title || path;
    trackVirtualPageView(path, title);
  }, [location.pathname, location.search, location.hash]);

  return null;
}
