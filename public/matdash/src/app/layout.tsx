import React from 'react';
import { Inter } from 'next/font/google';
import Providers from './providers';

import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'EduAvatar LMS - AI-Powered Learning Management System',
    template: '%s | EduAvatar LMS',
  },
  description: 'Professional Learning Management System with AI avatar generation, interactive quizzes, and comprehensive analytics.',
  keywords: ['LMS', 'Learning Management', 'AI Avatar', 'Education', 'E-learning', 'Google Vids'],
  authors: [{ name: 'EduAvatar Team' }],
  creator: 'EduAvatar',
  publisher: 'EduAvatar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://eduavatar-lms.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://eduavatar-lms.vercel.app',
    title: 'EduAvatar LMS - AI-Powered Learning Management System',
    description: 'Professional Learning Management System with AI avatar generation, interactive quizzes, and comprehensive analytics.',
    siteName: 'EduAvatar LMS',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'EduAvatar LMS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EduAvatar LMS - AI-Powered Learning Management System',
    description: 'Professional Learning Management System with AI avatar generation, interactive quizzes, and comprehensive analytics.',
    creator: '@eduavatar',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}