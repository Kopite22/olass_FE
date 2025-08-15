import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Metadata } from 'next';
import Head from 'next/head';
import * as React from 'react';

import '@/styles/globals.css';

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
        url: '/images/og.png',
        alt: 'og Image',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: '/images/og.png',
        alt: 'og Image',
      },
    ],
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
      <Head>
        <meta property='og:title' content='내 연봉 위치 확인하기' />
        <meta
          property='og:description'
          content='나랑 비슷한 사람은 얼마나 벌까?'
        />
        <meta property='og:image' content='/images/og.png' />
      </Head>
      <body className='bg-neutral-25 w-dvw h-dvh flex items-center justify-center'>
        <QueryClientProvider>
          {children}
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>
      </body>
    </html>
  );
}
