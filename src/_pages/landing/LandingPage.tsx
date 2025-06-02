'use client';

import { usePrefetchQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { GNB } from '@/components/common/GNB';
import { Screen } from '@/components/layout/Screen';

import { assetQueryKeys } from '@/apis/asset';
import { isProd } from '@/constant/env';
import { analytics } from '@/features/analytics';

import LandingFooter from './components/LandingFooter';
import LandingImage from './components/LandingImage';
import LandingText from './components/LandingText';

export default function LandingPage() {
  usePrefetchQuery(assetQueryKeys.getAllJobs());

  // 페이지 뷰 추적 및 사용자 속성 설정
  useEffect(() => {
    // 페이지 뷰 추적
    analytics.trackPageView(
      '/landing',
      '나랑 비슷한 사람들은 얼마나 벌까? - 연봉 비교 서비스',
      document.referrer || undefined
    );

    // 사용자 속성 설정
    analytics.setUserProperties({
      landing_visit_time: new Date().toISOString(),
      user_agent: navigator.userAgent.substring(0, 100), // UA 길이 제한
      screen_resolution: `${screen.width}x${screen.height}`,
    });

    // 개발 환경에서 디버그 정보 확인
    if (!isProd) {
      // eslint-disable-next-line no-console
      console.log('🚀 랜딩 페이지 분석 정보:', analytics.getDebugInfo());
    }
  }, []);

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
