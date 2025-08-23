'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __MATDASH_BOOTED?: boolean;       // app.js loaded once
    __MATDASH_INLINE_DONE?: boolean;  // inline scripts executed once
  }
}

/**
 * v0‑safe MatDash loader
 * - Fetch /matdash/index.html
 * - REMOVE only external <script src="..."> tags (to avoid duplicates)
 * - KEEP inline <script> blocks, run them AFTER app.js loads (so data renders)
 * - Inject Google Fonts (Material Icons + Roboto), ONE stylesheet, ONE script
 * - Guard with globals to avoid re‑execution on hot/preview reloads
 */
export default function Home() {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cleaned = false;

    fetch('/matdash/index.html')
      .then((res) => res.text())
      .then((raw) => {
        if (cleaned) return;

        const doc = new DOMParser().parseFromString(raw, 'text/html');

        // Collect inline scripts (no src). Remove ALL scripts; we'll run inlines later.
        const inlineScripts: string[] = [];
        doc.querySelectorAll('script').forEach((el) => {
          const src = el.getAttribute('src');
          if (!src && el.textContent && el.textContent.trim().length > 0) {
            inlineScripts.push(el.textContent);
          }
          el.remove();
        });

        // Remove any stylesheet links in the fetched HTML (we inject our own)
        doc.querySelectorAll('link[rel="stylesheet"]').forEach((el) => el.remove());

        const bodyHtml = doc?.body?.innerHTML ?? '';
        setHtml(bodyHtml);

        // --- Inject Google Fonts (icons + Roboto) ---
        const ensureHeadLink = (id: string, href: string) => {
          if (document.getElementById(id)) return;
          const link = document.createElement('link');
          link.id = id;
          link.rel = 'stylesheet';
          link.href = href;
          document.head.appendChild(link);
        };
        ensureHeadLink('matdash-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons');
        ensureHeadLink(
          'matdash-roboto',
          'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
        );

        // --- Inject ONE stylesheet for your app ---
        if (!document.querySelector('link[data-matdash="style"]')) {
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = '/matdash/style.css?v=6';
          link.setAttribute('data-matdash', 'style');
          document.head.appendChild(link);
        }

        // Helper: run the saved inline scripts exactly once, in order
        const runInlineScriptsOnce = () => {
          if (window.__MATDASH_INLINE_DONE) return;
          try {
            // Some inline code expects DOMContentLoaded; simulate it once.
            document.dispatchEvent(new Event('DOMContentLoaded'));
            inlineScripts.forEach((code) => {
              // eslint-disable-next-line no-new-func
              const fn = new Function(code);
              fn();
            });
            window.__MATDASH_INLINE_DONE = true;
          } catch (err) {
            console.error('MatDash inline script error:', err);
          }
        };

        // --- Inject ONE script for your app (guarded) ---
        if (!window.__MATDASH_BOOTED) {
          if (!document.querySelector('script[data-matdash="app"]')) {
            const s = document.createElement('script');
            s.src = '/matdash/app.js?v=6';
            s.defer = true;
            s.setAttribute('data-matdash', 'app');
            s.onload = () => {
              window.__MATDASH_BOOTED = true;
              runInlineScriptsOnce();
            };
            document.body.appendChild(s);
          }
        } else {
          // app.js already present (hot reload): just run the inline scripts
          runInlineScriptsOnce();
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
      // Sanitized HTML body; external scripts were removed.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
