'use client';

import { useEffect, useState } from 'react';

// Loads your static HTML and explicitly injects CSS/JS so v0 always styles it
export default function Home() {
  const [html, setHtml] = useState<string>('');

  useEffect(() => {
    let cleaned = false;

    fetch('/matdash/index.html')
      .then((res) => res.text())
      .then((raw) => {
        if (cleaned) return;

        const doc = new DOMParser().parseFromString(raw, 'text/html');
        const bodyHtml = doc?.body?.innerHTML ?? raw;
        setHtml(bodyHtml);

        const ensureCss = (href: string) => {
          if (document.querySelector(`link[data-matdash="${href}"]`)) return;
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          link.setAttribute('data-matdash', href);
          document.head.appendChild(link);
        };
        ensureCss('/matdash/style.css?v=2');
        ensureCss('/style.css?v=2'); // fallback copy

        const ensureJs = (src: string) => {
          if (document.querySelector(`script[data-matdash="${src}"]`)) return;
          const s = document.createElement('script');
          s.src = src;
          s.defer = true;
          s.setAttribute('data-matdash', src);
          document.body.appendChild(s);
        };
        ensureJs('/matdash/app.js?v=2');
        ensureJs('/app.js?v=2'); // fallback copy
      })
      .catch((e) => console.error('Failed to load /matdash/index.html', e));

    return () => { cleaned = true; };
  }, []);

  return (
    <div
      style={{ minHeight: '100vh', width: '100vw' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
