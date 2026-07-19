import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { pushAnalyticsEvent } from './dataLayer';

/**
 * Tracks navigation changes inside the React single-page application.
 *
 * The initial page load is measured automatically by the Google tag.
 * This component emits virtual_page_view only for subsequent
 * React Router navigation events, avoiding a duplicated initial view.
 */
export default function RouteTracker() {
  const location = useLocation();
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const pagePath =
      `${location.pathname}${location.search}${location.hash}`;

    pushAnalyticsEvent({
      event: 'virtual_page_view',
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [
    location.pathname,
    location.search,
    location.hash,
  ]);

  return null;
}
