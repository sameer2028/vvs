import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const VISITOR_KEY = 'vvs_visitor_id';

function getOrCreateVisitorId() {
  let visitorId = localStorage.getItem(VISITOR_KEY);
  if (!visitorId) {
    visitorId = 'v_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem(VISITOR_KEY, visitorId);
  }
  return visitorId;
}

export default function AnalyticsTracker() {
  const location = useLocation();
  const lastPathRef = useRef(null);

  useEffect(() => {
    const currentPath = location.pathname;

    // Do not track admin routes
    if (currentPath.startsWith('/admin')) {
      return;
    }

    // Avoid duplicate tracking on rapid re-renders of the same path
    if (lastPathRef.current === currentPath) {
      return;
    }
    lastPathRef.current = currentPath;

    const visitorId = getOrCreateVisitorId();
    const apiUrl = `${import.meta.env.VITE_API_URL || ''}/api/analytics/track`;
    const payload = JSON.stringify({
      path: currentPath,
      visitorId,
      referrer: document.referrer || ''
    });

    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([payload], { type: 'application/json' });
        navigator.sendBeacon(apiUrl, blob);
      } else {
        fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true
        }).catch(() => {});
      }
    } catch (err) {
      // Fail silently so tracking never interferes with user UI
    }
  }, [location]);

  return null;
}
