'use client';

import {
  GoogleAnalytics as NextGoogleAnalytics,
  sendGAEvent,
} from '@next/third-parties/google';
import { useEffect } from 'react';

import {
  ACTIVE_EXPERIMENTS,
  getClientExperiments,
} from '@/features/ga-ab-test/abtest';

interface GoogleAnalyticsProps {
  measurementId: string;
}

export default function GoogleAnalytics({
  measurementId,
}: GoogleAnalyticsProps) {
  useEffect(() => {
    // 페이지가 로드된 후 실험 정보 설정
    const setExperimentDimensions = () => {
      const experiments = getClientExperiments();

      // 모든 실험 정보를 하나의 이벤트로 전송
      const experimentData: Record<string, string> = {};

      // 각 실험에 대한 dimension 값 설정
      ACTIVE_EXPERIMENTS.forEach((experiment) => {
        if (experiments[experiment.name]) {
          // 각 dimension 값을 객체에 추가
          experimentData[experiment.dimension] = experiments[experiment.name];
        }
      });

      // 실험 정보가 있는 경우만 이벤트 전송
      if (Object.keys(experimentData).length > 0) {
        // 사용자 속성으로 실험 정보 설정
        sendGAEvent('set', 'user_properties', experimentData);

        // 페이지뷰 이벤트에도 동일한 실험 정보 포함
        sendGAEvent('page_view', 'experiment_impression', experimentData);
      }
    };

    // 컴포넌트 마운트 시 실험 정보 설정
    // 약간의 지연을 두어 GA가 로드될 시간을 확보
    const timer = setTimeout(() => {
      setExperimentDimensions();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return <NextGoogleAnalytics gaId={measurementId} />;
}
