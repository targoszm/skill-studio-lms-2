'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __MATDASH_BOOTED?: boolean;       // app.js loaded once
    __MATDASH_INLINE_DONE?: boolean;  // inline scripts executed once
  }
}

/**
 * v0-safe MatDash loader (self-cleaning)
 * - Fetch /matdash/index.html
 * - KEEP inline scripts (run them after app.js)
 * - Strip ALL <script> tags from fetched HTML (we'll run inlines ourselves)
 * - Before injecting: remove ANY old app.js/style elements (including ?v=2, ?v=3...)
 * - Inject ONE stylesheet and ONE script with a new version token
 * - Guard with globals so we don't re-run on hot/preview reloads
 */
export default function Home() {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cleaned = false;

    const VERSION = '7'; // bump this if you ever need to hard-refresh caches
    const APP_JS = `/matdash/app.js?v=${VERSION}`;
    const APP_CSS = `/matdash/style.css?v=${VERSION}`;

    fetch('/matdash/index.html')
      .then((res) => res.text())
      .then((raw) => {
        if (cleaned) return;

        const doc = new DOMParser().parseFromString(raw, 'text/html');

        // Collect inline scripts (no src). Remove ALL scripts in fetched HTML.
        const inlineScripts: string[] = [];
        doc.querySelectorAll('script').forEach((el) => {
          const src = el.getAttribute('src');
          if (!src && el.textContent && el.textContent.trim().length > 0) {
            inlineScripts.push(el.textContent);
          }
          el.remove();
        });

        // Remove <link rel="stylesheet"> in fetched HTML – we inject our own
        doc.querySelectorAll('link[rel="stylesheet"]').forEach((el) => el.remove());

        const bodyHtml = doc?.body?.innerHTML ?? '';
        setHtml(bodyHtml);

        // ---- Self-clean any previously injected or stale tags ----
        // Remove any old matdash app.js (any version) + any tag that targeted /app.js at root.
        document
          .querySelectorAll<HTMLScriptElement>('script[src*="/matdash/app.js"],script[src="/app.js"],script[data-matdash="app"]')
          .forEach((n) => n.remove());
        // Remove any old matdash style (any version) + any root fallback
        document
          .querySelectorAll<HTMLLinkElement>('link[href*="/matdash/style.css"],link[href="/style.css"],link[data-matdash="style"]')
          .forEach((n) => n.remove());

        // ----- Inject Google Fonts (icons + Roboto) -----
        const ensureHeadLink = (id: string, href: string) => {
          if (document.getElementById(id)) return;
          const link = document.createElement('link');
          link.id = id;
          link.rel = 'stylesheet';
          link.href = href;
          document.head.appendChild(link);
        };
        ensureHeadLink('matdash-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons');
        ensureHeadLink('matdash-roboto', 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

        // ----- Inject ONE stylesheet for your app -----
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = APP_CSS;
        css.setAttribute('data-matdash', 'style');
        document.head.appendChild(css);

        // Helper: run inline scripts exactly once, after app.js is ready
        const runInlineScriptsOnce = () => {
          if (window.__MATDASH_INLINE_DONE) return;
          try {
            document.dispatchEvent(new Event('DOMContentLoaded'));
            inlineScripts.forEach((code) => {
              // eslint-disable-next-line no-new-func
              new Function(code)();
            });
            window.__MATDASH_INLINE_DONE = true;
          } catch (err) {
            console.error('MatDash inline script error:', err);
          }
        };

        // ----- Inject ONE script for your app (guard + cleanup ensured) -----
        if (!window.__MATDASH_BOOTED) {
          const s = document.createElement('script');
          s.src = APP_JS;
          s.defer = true;
          s.setAttribute('data-matdash', 'app');
          s.onload = () => {
            window.__MATDASH_BOOTED = true;
            runInlineScriptsOnce();
          };
          document.body.appendChild(s);
        } else {
          // app.js already available from a prior load; just run inlines
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
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
