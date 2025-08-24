'use client';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => { window.location.replace('/matdash/index.html'); }, []);
  return (
    <main style={{ fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif', padding: 24 }}>
      <h1 style={{ margin: 0, fontSize: 18 }}>Loading dashboard…</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        If it doesn’t redirect, open <code>/matdash/index.html</code> directly.
      </p>
    </main>
  );
}