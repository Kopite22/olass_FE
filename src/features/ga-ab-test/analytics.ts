// lib/analytics.ts
'use client';

import { sendGAEvent } from '@next/third-parties/google';

import { ACTIVE_EXPERIMENTS, Experiments } from './abtest';

/**
 * A/B 테스트 측정을 위한 이벤트 전송 유틸리티
 * 모든 GA 관련 로직을 한 곳에서 관리
 */

/**
 * 실험 정보를 GA에 전송하는 함수
 * @param experiments 사용자의 실험 정보
 */
export function sendExperimentData(experiments: Experiments): void {
  // 실험 데이터 준비
  const experimentData: Record<string, string> = {};
  let hasExperiments = false;

  // 각 실험에 대한 dimension 값 설정
  ACTIVE_EXPERIMENTS.forEach((experiment) => {
    if (experiments[experiment.name]) {
      // 각 dimension 값을 객체에 추가
      experimentData[experiment.dimension] = experiments[experiment.name];
      hasExperiments = true;
    }
  });

  // 실험 정보가 있는 경우만 이벤트 전송
  if (hasExperiments) {
    // 사용자 속성으로 실험 정보 설정
    sendGAEvent('set', 'user_properties', experimentData);

    // 페이지뷰 이벤트에도 동일한 실험 정보 포함
    sendGAEvent('page_view', 'experiment_impression', experimentData);
  }
}

/**
 * 특정 변형에 대한 전환 이벤트 전송
 * @param experimentName 실험 이름
 * @param variantName 변형 이름
 * @param action 사용자 액션 (예: 'click', 'submit' 등)
 * @param additionalData 추가 데이터
 */
export function sendExperimentConversion(
  experimentName: string,
  variantName: string,
  action: string,
  additionalData: Record<string, unknown> = {}
): void {
  // 실험 정보 찾기
  const experiment = ACTIVE_EXPERIMENTS.find(
    (exp) => exp.name === experimentName
  );

  if (!experiment) return;

  // 전환 이벤트 전송
  sendGAEvent('conversion', 'experiment_conversion', {
    experiment_name: experimentName,
    variant_name: variantName,
    [experiment.dimension]: variantName,
    action,
    ...additionalData,
  });
}

/**
 * 유용한 이벤트 카테고리
 */
export enum EventCategory {
  CLICK = 'click',
  IMPRESSION = 'impression',
  CONVERSION = 'conversion',
  ENGAGEMENT = 'engagement',
  ERROR = 'error',
}

/**
 * 일반적인 이벤트 전송 함수
 */
export function trackEvent(
  category: string,
  action: string,
  data: Record<string, unknown> = {}
): void {
  sendGAEvent(category, action, data);
}
