import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';

import GoogleAnalytics from '@/lib/GoogleAnalytics';
import GoogleTagManager from '@/lib/GoogleTagManager';

import { generateCommonMetadata } from '@/entities/utils/generateMetadata';
import QueryClientProvider from '@/providers/QueryClientProvider';

export const metadata: Metadata = generateCommonMetadata({
  path: '/',
});

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
