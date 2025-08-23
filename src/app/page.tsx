'use client';

import { useEffect } from 'react';

/**
 * MatDash portal loader (v11)
 * - Renders NOTHING inside React (prevents hydration errors like #418)
 * - Creates #matdash-portal in document.body and injects HTML there
 * - Vendor scripts -> app.js -> inline scripts (sequential, once)
 * - Self-cleans stale CSS/JS before injecting
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

const VER = '11'; // bump to bust caches if needed
const APP_CSS = `/matdash/style.css?v=${VER}`;
const APP_JS  = `/matdash/app.js?v=${VER}`;

export default function Home() {
  useEffect(() => {
    let cancelled = false;

    // 0) Create (or replace) the portal outside React
    const existing = document.getElementById('matdash-portal');
    if (existing) existing.remove();
    const portal = document.createElement('div');
    portal.id = 'matdash-portal';
    portal.style.minHeight = '100vh';
    portal.style.width = '100vw';
    document.body.appendChild(portal);

    const normalizeSrc = (src: string) => {
      if (!src) return '';
      if (/^https?:\/\//i.test(src)) return src;
      if (src.startsWith('/')) return src;
      return `/matdash/${src.replace(/^\.?\//, '')}`;
    };

    const removeExisting = () => {
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

    const loadScriptOnce = (src: string, dataAttr: 'vendor' | 'app') =>
      new Promise<void>((resolve, reject) => {
        document.querySelectorAll<HTMLScriptElement>(`script[src="${src}"]`).forEach((n) => n.remove());
        const s = document.createElement('script');
        s.src = src;
        s.defer = true;
        s.setAttribute('data-matdash', dataAttr);
        s.onload = () => resolve();
        s.onerror = (e) => reject(e);
        document.body.appendChild(s);
      });

    const loadSequential = async (srcs: string[]) => {
      for (const src of srcs) await loadScriptOnce(src, 'vendor');
    };

    // 1) Fetch + prepare HTML
    fetch('/matdash/index.html')
      .then((r) => r.text())
      .then(async (raw) => {
        if (cancelled) return;

        const doc = new DOMParser().parseFromString(raw, 'text/html');

        // Collect vendor scripts (keep order), excluding app.js
        const vendorSrcs: string[] = [];
        doc.querySelectorAll('script[src]').forEach((el) => {
          const src = normalizeSrc(el.getAttribute('src') || '');
          if (!src) return;
          if (src.includes('/matdash/app.js')) return; // we inject with version
          if (!vendorSrcs.includes(src)) vendorSrcs.push(src);
        });

        // Collect inline scripts
        const inlineScripts: string[] = [];
        doc.querySelectorAll('script:not([src])').forEach((el) => {
          const code = el.textContent?.trim();
          if (code) inlineScripts.push(code);
        });

        // Strip scripts & styles from fetched HTML body
        doc.querySelectorAll('script').forEach((el) => el.remove());
        doc.querySelectorAll('link[rel="stylesheet"]').forEach((el) => el.remove());

        // Inject sanitized HTML into the OUT-OF-REACT portal
        portal.innerHTML = doc.body?.innerHTML ?? '';

        // Clean stale assets
        removeExisting();

        // Fonts + ONE stylesheet
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

        // Load vendor scripts once
        if (!window.__MATDASH_VENDOR_DONE) {
          try {
            await loadSequential(vendorSrcs);
            window.__MATDASH_VENDOR_DONE = true;
            if (!window.$ && (window as any).jQuery) window.$ = (window as any).jQuery;
          } catch (err) {
            console.error('MatDash vendor script failed:', err);
          }
        }

        // Load app.js once
        const bootApp = async () => {
          if (window.__MATDASH_BOOTED) return;
          try {
            await loadScriptOnce(APP_JS, 'app');
            window.__MATDASH_BOOTED = true;
          } catch (err) {
            console.error('MatDash app.js failed:', err);
          }
        };

        // Run inline init scripts once
        const runInlineOnce = () => {
          if (window.__MATDASH_INLINE_DONE) return;
          try {
            document.dispatchEvent(new Event('DOMContentLoaded'));
            window.dispatchEvent(new Event('load'));
            for (const code of inlineScripts) new Function(code)();
            window.__MATDASH_INLINE_DONE = true;
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
      // Optional cleanup: remove portal on unmount
      portal.remove();
    };
  }, []);

  // Render nothing into React’s DOM to avoid hydration mismatches
  return null;
}
