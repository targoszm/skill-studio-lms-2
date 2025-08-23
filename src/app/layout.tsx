import './globals.css';
import Providers from './providers';

export const metadata = {
  title: 'MatDash LMS',
  description: 'LMS demo ready for v0 + Vercel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
