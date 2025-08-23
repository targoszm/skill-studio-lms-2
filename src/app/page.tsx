// src/app/page.tsx
'use client';

export default function Home() {
  // Renders your real app directly from public/matdash/
  return (
    <iframe
      src="/matdash/index.html"
      style={{ width: '100vw', height: '100vh', border: 'none' }}
      title="MatDash LMS"
    />
  );
}
