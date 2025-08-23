import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';

import GoogleAnalytics from '@/lib/GoogleAnalytics';
import GoogleTagManager from '@/lib/GoogleTagManager';

import { siteConfig } from '@/constant/config';
import QueryClientProvider from '@/providers/QueryClientProvider';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/favicon-16x16.png',
  },
  manifest: `/favicon/site.webmanifest`,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [
      {
        url: `${siteConfig.url}/images/og.png`, // 절대 경로로 변경
        alt: 'og Image',
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
    locale: 'ko_KR', // 한국어로 변경
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/images/og.png`, // 절대 경로로 변경
        alt: 'og Image',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className='bg-neutral-25 w-dvw h-dvh flex items-center justify-center'>
        <GoogleTagManager />
        <QueryClientProvider>
          {children}
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
