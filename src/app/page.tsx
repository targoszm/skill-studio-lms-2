'use client';

import { useEffect, useState } from 'react';

/**
 * MatDash loader (v10)
 * - Fetch /matdash/index.html
 * - Extract vendor scripts (in order) EXCEPT /matdash/app.js
 * - Extract inline scripts
 * - Strip scripts/styles from HTML before injecting
 * - Inject Google Fonts + a single style.css
 * - Load vendor scripts sequentially -> app.js once -> run inline scripts once
 * - Safe in v0 preview sandbox
 */

declare global {
  interface Window {
    __MATDASH_VENDOR_DONE?: boolean;
    __MATDASH_BOOTED?: boolean;
    __MATDASH_INLINE_DONE?: boolean;
    jQuery?: any;
    $?: any;
  }
}

const DEBUG = false; // set to true if you want console logs
const VER = '10';    // bump to bust caches when you update assets

export default function Home() {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cancelled = false;

    const log = (...args: any[]) => {
      if (DEBUG) console.log('[MATDASH LOADER]', ...args);
    };

    const APP_CSS = `/matdash/style.css?v=${VER}`;
    const APP_JS = `/matdash/app.js?v=${VER}`;

    const removeExisting = () => {
      // Clean previously injected tags (avoid redeclare + double styles)
      document
        .querySelectorAll<HTMLScriptElement>(
          'script[data-matdash="vendor"],script[data-matdash="app"]'
        )
        .forEach((n) => n.remove());

      document
        .querySelectorAll<HTMLLinkElement>('link[data-matdash="style"]')
        .forEach((n) => n.remove());
    };

    const ensureHeadLink = (id: string, href: string) => {
      if (document.getElementById(id)) return;
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    };

    const normalizeSrc = (src: string) => {
      if (!src) return '';
      if (/^https?:\/\//i.test(src)) return src;
      if (src.startsWith('/')) return src;
      // make relative paths point to /matdash/…
      return `/matdash/${src.replace(/^\.?\//, '')}`;
    };

    const loadScriptOnce = (src: string, dataAttr: 'vendor' | 'app') =>
      new Promise<void>((resolve, reject) => {
        // If a script with this exact src already exists, remove it first
        document
          .querySelectorAll<HTMLScriptElement>(`script[src="${src}"]`)
          .forEach((n) => n.remove());

        const s = document.createElement('script');
        s.src = src;
        s.defer = true;
        s.setAttribute('data-matdash', dataAttr);
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.body.appendChild(s);
      });

    const loadSequential = async (srcs: string[]) => {
      for (const src of srcs) {
        await loadScriptOnce(src, 'vendor');
        log('loaded vendor:', src);
      }
    };

    fetch('/matdash/index.html')
      .then((r) => r.text())
      .then(async (raw) => {
        if (cancelled) return;

        const doc = new DOMParser().parseFromString(raw, 'text/html');

        // 1) Collect vendor scripts (in original order), excluding app.js
        const vendorSrcs: string[] = [];
        doc.querySelectorAll('script[src]').forEach((el) => {
          const src = normalizeSrc(el.getAttribute('src') || '');
          if (!src) return;
          // skip our main app.js (we load it once with a cache-busting query)
          if (src.includes('/matdash/app.js')) return;
          if (!vendorSrcs.includes(src)) vendorSrcs.push(src);
        });

        // 2) Collect inline scripts (usually init code like chart setup)
        const inlineScripts: string[] = [];
        doc.querySelectorAll('script:not([src])').forEach((el) => {
          const code = el.textContent?.trim();
          if (code) inlineScripts.push(code);
        });

        // 3) Remove all scripts and styles from fetched HTML
        doc.querySelectorAll('script').forEach((el) => el.remove());
        doc.querySelectorAll('link[rel="stylesheet"]').forEach((el) => el.remove());

        // 4) Inject sanitized HTML into the page
        const bodyHtml = doc.body?.innerHTML ?? '';
        setHtml(bodyHtml);

        // 5) Clean any previously injected CSS/JS
        removeExisting();

        // 6) Fonts + single stylesheet
        ensureHeadLink('matdash-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons');
        ensureHeadLink(
          'matdash-roboto',
          'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap'
        );

        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = APP_CSS;
        css.setAttribute('data-matdash', 'style');
        document.head.appendChild(css);

        // 7) Load vendor libs sequentially (once)
        if (!window.__MATDASH_VENDOR_DONE) {
          try {
            await loadSequential(vendorSrcs);
            window.__MATDASH_VENDOR_DONE = true;

            // Make sure jQuery globals exist if vendor provided jQuery
            if (!window.$ && (window as any).jQuery) window.$ = (window as any).jQuery;
          } catch (err) {
            console.error('MatDash vendor script failed:', err);
          }
        }

        // 8) Load app.js once
        const bootApp = async () => {
          if (window.__MATDASH_BOOTED) return;
          try {
            await loadScriptOnce(APP_JS, 'app');
            window.__MATDASH_BOOTED = true;
            log('booted app.js');
          } catch (err) {
            console.error('MatDash app.js failed:', err);
          }
        };

        // 9) Run inline init scripts (after app.js)
        const runInlineOnce = () => {
          if (window.__MATDASH_INLINE_DONE) return;
          try {
            // Some bundles expect these events
            document.dispatchEvent(new Event('DOMContentLoaded'));
            window.dispatchEvent(new Event('load'));

            for (const code of inlineScripts) {
              // eslint-disable-next-line no-new-func
              new Function(code)();
            }
            window.__MATDASH_INLINE_DONE = true;
            log('ran inline inits');
          } catch (err) {
            console.error('MatDash inline script error:', err);
          }
        };

        await bootApp();
        runInlineOnce();
      })
      .catch((e) => console.error('Failed to load /matdash/index.html', e));

    return () => {
      cancelled = true;
    };
  }, []);

  // Render ONLY a plain div with the injected markup
  return (
    <div
      style={{ minHeight: '100vh', width: '100vw' }}
      dangerouslySetInnerHTML={{ __html: html || '' }}
    />
  );
}
