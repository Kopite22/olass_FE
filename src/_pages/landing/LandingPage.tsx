'use client';

import { usePrefetchQuery } from '@tanstack/react-query';

import { GNB } from '@/components/common/GNB';
import { Screen } from '@/components/layout/Screen';

import { assetQueryKeys } from '@/apis/asset';

import LandingFooter from './components/LandingFooter';
import LandingImage from './components/LandingImage';
import LandingText from './components/LandingText';

export default function LandingPage() {
  usePrefetchQuery(assetQueryKeys.getAllJobs());

  return (
    <Screen className='flex flex-col justify-center gap-8 bg-neutral-0'>
      <GNB />
      <main className='flex-1 flex flex-col items-center justify-center gap-[77px]'>
        <div className='flex flex-col items-center w-full px-5 sm:px-[75px] gap-1.5'>
          <LandingText />
          <LandingImage />
        </div>
        <LandingFooter />
      </main>
    </Screen>
  );
}
