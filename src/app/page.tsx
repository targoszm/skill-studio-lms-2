'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __MATDASH_BOOTED?: boolean;
  }
}

/**
 * Robust MatDash loader for v0:
 * - fetch the HTML body from /matdash/index.html
 * - inject EXACTLY ONE stylesheet and EXACTLY ONE script
 * - guard against duplicate JS execution (prevents "already been declared")
 */
export default function Home() {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cleaned = false;

    // 1) Load HTML
    fetch('/matdash/index.html')
      .then((res) => res.text())
      .then((raw) => {
        if (cleaned) return;

        // Grab only the body so we don't duplicate <head>
        const doc = new DOMParser().parseFromString(raw, 'text/html');
        const bodyHtml = doc?.body?.innerHTML ?? raw;
        setHtml(bodyHtml);

        // 2) Ensure a single CSS
        const cssHref = '/matdash/style.css?v=3';
        if (!document.querySelector(`link[data-matdash="style"]`)) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = cssHref;
          link.setAttribute('data-matdash', 'style');
          document.head.appendChild(link);
        }

        // 3) Ensure a single JS with a global guard
        if (!window.__MATDASH_BOOTED) {
          // Avoid double-inject if a previous render started it
          if (!document.querySelector('script[data-matdash="app"]')) {
            const s = document.createElement('script');
            s.src = '/matdash/app.js?v=3';
            s.defer = true;
            s.setAttribute('data-matdash', 'app');
            s.onload = () => {
              // Mark as booted to prevent any re-injection
              window.__MATDASH_BOOTED = true;
            };
            document.body.appendChild(s);
          }
        }
      })
      .catch((e) => console.error('Failed to load /matdash/index.html', e));

    return () => {
      cleaned = true;
    };
  }, []);

  return (
    <div
      style={{ minHeight: '100vh', width: '100vw' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
