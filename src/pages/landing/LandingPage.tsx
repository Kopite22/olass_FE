'use client';

import * as React from 'react';

import Screen from '@/components/layout/Screen/Screen';
import { GNB } from '@/components/ui/GNB';

import LandingFooter from './components/LandingFooter';
import LandingImage from './components/LandingImage';
import LandingText from './components/LandingText';

export default function LandingPage() {
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
