'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __MATDASH_BOOTED?: boolean;
  }
}

/**
 * v0‑safe MatDash loader
 * - Fetch /matdash/index.html
 * - Strip ALL <script> and stylesheet <link> tags from the fetched HTML
 * - Inject EXACTLY ONE stylesheet and EXACTLY ONE script
 * - Guard re-injection with a global flag to avoid "already been declared"
 */
export default function Home() {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cleaned = false;

    fetch('/matdash/index.html')
      .then((res) => res.text())
      .then((raw) => {
        if (cleaned) return;

        // Parse the HTML
        const doc = new DOMParser().parseFromString(raw, 'text/html');

        // 1) Remove *all* <script> tags from the fetched HTML body
        doc.querySelectorAll('script').forEach((el) => el.remove());

        // 2) Remove any stylesheet links to avoid duplicate CSS (optional but safe)
        doc
          .querySelectorAll('link[rel="stylesheet"]')
          .forEach((el) => el.remove());

        const bodyHtml = doc?.body?.innerHTML ?? '';

        // Put the sanitized HTML into the page
        setHtml(bodyHtml);

        // 3) Ensure a single CSS
        const cssHref = '/matdash/style.css?v=4';
        if (!document.querySelector('link[data-matdash="style"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = cssHref;
          link.setAttribute('data-matdash', 'style');
          document.head.appendChild(link);
        }

        // 4) Ensure a single JS (guard double-execution)
        if (!window.__MATDASH_BOOTED) {
          if (!document.querySelector('script[data-matdash="app"]')) {
            const s = document.createElement('script');
            s.src = '/matdash/app.js?v=4';
            s.defer = true;
            s.setAttribute('data-matdash', 'app');
            s.onload = () => {
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
      // The HTML is *sanitized* (no scripts/links) and safe to mount
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
