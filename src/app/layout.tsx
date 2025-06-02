import { GoogleTagManager } from '@next/third-parties/google';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';

import GoogleAnalytics from '@/components/ga/GoogleAnalytics';

import { siteConfig } from '@/constant/config';
import { GA_MEASUREMENT_ID, GOOGLE_TAG_MANGER_ID } from '@/constant/env';
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
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: `/favicon/site.webmanifest`,
  openGraph: {
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.title,
    images: [`${siteConfig.url}/images/og.jpg`],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [`${siteConfig.url}/images/og.jpg`],
    // creator: '@th_clarence',
  },
  // authors: [
  //   {
  //     name: 'Theodorus Clarence',
  //     url: 'https://theodorusclarence.com',
  //   },
  // ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className='bg-neutral-25 w-dvw h-dvh flex items-center justify-center'>
        <QueryClientProvider>
          {children}
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </body>
      <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      <GoogleTagManager gtmId={GOOGLE_TAG_MANGER_ID} />
    </html>
  );
}
