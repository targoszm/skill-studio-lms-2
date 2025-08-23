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
 * - Inject Google Fonts (Material Icons + Roboto), ONE stylesheet, ONE script
 * - Guard JS re-injection to avoid "already been declared"
 */
export default function Home() {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cleaned = false;

    fetch('/matdash/index.html')
      .then((res) => res.text())
      .then((raw) => {
        if (cleaned) return;

        // Parse the HTML we ship in public/matdash/
        const doc = new DOMParser().parseFromString(raw, 'text/html');

        // Remove all scripts and stylesheet links from the fetched HTML body
        doc.querySelectorAll('script').forEach((el) => el.remove());
        doc.querySelectorAll('link[rel="stylesheet"]').forEach((el) => el.remove());

        const bodyHtml = doc?.body?.innerHTML ?? '';
        setHtml(bodyHtml);

        // ----- Inject Google Fonts (icons + Roboto) -----
        const ensureHeadLink = (id: string, href: string) => {
          if (document.getElementById(id)) return;
          const link = document.createElement('link');
          link.id = id;
          link.rel = 'stylesheet';
          link.href = href;
          document.head.appendChild(link);
        };
        ensureHeadLink(
          'matdash-icons',
          'https://fonts.googleapis.com/icon?family=Material+Icons'
        );
        ensureHeadLink(
          'matdash-roboto',
          'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
        );

        // ----- Inject ONE stylesheet for your app -----
        if (!document.querySelector('link[data-matdash="style"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/matdash/style.css?v=5';
          link.setAttribute('data-matdash', 'style');
          document.head.appendChild(link);
        }

        // ----- Inject ONE script for your app (guarded) -----
        if (!window.__MATDASH_BOOTED) {
          if (!document.querySelector('script[data-matdash="app"]')) {
            const s = document.createElement('script');
            s.src = '/matdash/app.js?v=5';
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
      // sanitized HTML (no scripts/links) – safe to mount
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
