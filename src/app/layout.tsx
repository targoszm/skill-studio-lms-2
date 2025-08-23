import './globals.css';
import type { Metadata } from 'next';

// IMPORTANT: this layout is for the React port branch only.
// It loads fonts + your MatDash CSS (for visuals), while all UI is React.

export const metadata: Metadata = {
  title: 'MatDash LMS (React Port)',
  description: 'React component version for v0 visual editing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        {/* Reuse your existing MatDash CSS for styling */}
        <link rel="stylesheet" href="/matdash/style.css" />
      </head>
      <body style={{ minHeight: '100vh', background: '#f4f6f9' }}>{children}</body>
    </html>
  );
}
