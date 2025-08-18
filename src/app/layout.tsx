import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Metadata } from 'next';
import Script from 'next/script';
import * as React from 'react';

import '@/styles/globals.css';

import GoogleAnalytics from '@/lib/GoogleAnalytics';

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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta property='og:title' content='내 연봉 위치 확인하기' />
        <meta
          property='og:description'
          content='나랑 비슷한 사람은 얼마나 벌까?'
        />
        <meta property='og:image' content='/images/og.png' />
      </head>
      <body className='bg-neutral-25 w-dvw h-dvh flex items-center justify-center'>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-N9XCHTKX'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <QueryClientProvider>
          {children}
          <ReactQueryDevtools initialIsOpen />
        </QueryClientProvider>

        <GoogleAnalytics />

        {/* Google Tag Manager */}
        <Script
          id='gtm'
          strategy='afterInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N9XCHTKX');
            `,
          }}
        />
      </body>
    </html>
  );
}
