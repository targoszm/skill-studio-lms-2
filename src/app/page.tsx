'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __MATDASH_BOOTED?: boolean;       // app.js loaded once
    __MATDASH_INLINE_DONE?: boolean;  // inline scripts executed once
    __MATDASH_VENDOR_DONE?: boolean;  // vendor scripts loaded once
  }
}

/**
 * v0‑safe MatDash loader (sequential vendor support)
 * - Fetch /matdash/index.html
 * - Collect:
 *    a) external vendor scripts (script[src], EXCEPT our /matdash/app.js)
 *    b) inline scripts (script without src)
 * - Remove all <script> and <link rel="stylesheet"> in fetched HTML body
 * - Self-clean any previous injected tags (any ?v=*)
 * - Inject Google Fonts + ONE style.css
 * - Load vendor scripts SEQUENTIALLY (once), then load ONE app.js (once),
 *   then run inline scripts (once)
 */
export default function Home() {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cleaned = false;

    const VERSION = '8'; // bump if you need to invalidate cache
    const APP_JS = `/matdash/app.js?v=${VERSION}`;
    const APP_CSS = `/matdash/style.css?v=${VERSION}`;

    // Helper to load a script src once, with cleanup of any prior duplicates
    const loadScriptOnce = (src: string): Promise<void> => {
      // remove any prior matching script nodes
      document.querySelectorAll<HTMLScriptElement>(`script[src="${src}"]`).forEach((n) => n.remove());

      return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = src;
        s.defer = true;
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.body.appendChild(s);
      });
    };

    // Sequentially load an array of scripts
    const loadScriptsSequentially = async (srcs: string[]) => {
      for (const src of srcs) {
        await loadScriptOnce(src);
      }
    };

    fetch('/matdash/index.html')
      .then((res) => res.text())
      .then(async (raw) => {
        if (cleaned) return;

        const doc = new DOMParser().parseFromString(raw, 'text/html');

        // 1) Collect vendor scripts (those with src), EXCLUDING our app.js
        const vendorSrcs: string[] = [];
        doc.querySelectorAll('script[src]').forEach((el) => {
          const src = el.getAttribute('src') || '';
          // normalize to absolute path when possible
          const normalized = src.startsWith('http')
            ? src
            : src.startsWith('/')
            ? src
            : `/matdash/${src.replace(/^\.?\//, '')}`;

          // exclude our main app.js (we inject with version)
          if (normalized.includes('/matdash/app.js')) return;

          // avoid duplicates in array
          if (!vendorSrcs.includes(normalized)) vendorSrcs.push(normalized);
        });

        // 2) Collect inline scripts (no src)
        const inlineScripts: string[] = [];
        doc.querySelectorAll('script:not([src])').forEach((el) => {
          const code = el.textContent?.trim();
          if (code) inlineScripts.push(code);
        });

        // 3) Remove ALL scripts & all stylesheet links from fetched HTML
        doc.querySelectorAll('script').forEach((el) => el.remove());
        doc.querySelectorAll('link[rel="stylesheet"]').forEach((el) => el.remove());

        // 4) Mount sanitized HTML
        const bodyHtml = doc?.body?.innerHTML ?? '';
        setHtml(bodyHtml);

        // 5) Self-clean any previous injected tags (any version)
        document
          .querySelectorAll<HTMLScriptElement>('script[src*="/matdash/app.js"],script[src="/app.js"],script[data-matdash="app"]')
          .forEach((n) => n.remove());
        document
          .querySelectorAll<HTMLLinkElement>('link[href*="/matdash/style.css"],link[href="/style.css"],link[data-matdash="style"]')
          .forEach((n) => n.remove());

        // 6) Inject Google Fonts (icons + Roboto) once
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

        // 7) Inject ONE stylesheet
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = APP_CSS;
        css.setAttribute('data-matdash', 'style');
        document.head.appendChild(css);

        // 8) Load vendor scripts (only once per preview session)
        if (!window.__MATDASH_VENDOR_DONE) {
          try {
            await loadScriptsSequentially(vendorSrcs);
            window.__MATDASH_VENDOR_DONE = true;
          } catch (err) {
            console.error('MatDash vendor script failed:', err);
          }
        }

        // Helper to run inline scripts once
        const runInlineScriptsOnce = () => {
          if (window.__MATDASH_INLINE_DONE) return;
          try {
            document.dispatchEvent(new Event('DOMContentLoaded'));
            for (const code of inlineScripts) {
              // eslint-disable-next-line no-new-func
              new Function(code)();
            }
            window.__MATDASH_INLINE_DONE = true;
          } catch (err) {
            console.error('MatDash inline script error:', err);
          }
        };

        // 9) Load ONE app.js (then inline scripts)
        if (!window.__MATDASH_BOOTED) {
          try {
            await loadScriptOnce(APP_JS);
            window.__MATDASH_BOOTED = true;
            runInlineScriptsOnce();
          } catch (err) {
            console.error('MatDash app.js failed:', err);
          }
        } else {
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
