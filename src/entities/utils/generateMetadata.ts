import { Metadata } from 'next';

import { siteConfig } from '@/constant/config';

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  searchParams?: Record<string, string>;
  imagePath?: string;
}

export function generateCommonMetadata({
  title = siteConfig.title,
  description = siteConfig.description,
  path = '',
  searchParams,
  imagePath = '/images/og.png',
}: GenerateMetadataOptions): Metadata {
  const url = searchParams
    ? `${siteConfig.url}${path}?${new URLSearchParams(searchParams).toString()}`
    : `${siteConfig.url}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.title,
      images: [
        {
          url: `${siteConfig.url}${imagePath}`,
          alt: title,
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
      locale: 'ko_KR',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: `${siteConfig.url}${imagePath}`,
          alt: title,
        },
      ],
    },
  };
}
