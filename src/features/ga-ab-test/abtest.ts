// lib/abtest.ts
import { NextRequest } from 'next/server';

import logger from '@/lib/logger';

// 실험 구성 타입 정의
export interface ExperimentConfig {
  name: string;
  variants: string[];
  weights: number[];
  dimension: string;
}

// 실험 결과 타입 정의
export interface Experiments {
  [key: string]: string;
}

// 현재 활성화된 실험 구성
// 확장성을 위해 여러 실험을 설정할 수 있음
export const ACTIVE_EXPERIMENTS: ExperimentConfig[] = [
  {
    name: 'product-detail-redesign',
    variants: ['control', 'variant'],
    weights: [0.8, 0.2], // 80% 컨트롤, 20% 변형
    dimension: 'dimension2',
  },
  // 추가 실험을 필요에 따라 여기에 정의
];

/**
 * 요청에서 기존 실험 쿠키를 가져옴
 */
export function getExistingExperiments(request: NextRequest): Experiments {
  const experimentCookie = request.cookies.get('ab-experiments');
  if (experimentCookie?.value) {
    try {
      return JSON.parse(experimentCookie.value) as Experiments;
    } catch (e) {
      return {};
    }
  }
  return {};
}

/**
 * 실험 가중치에 따라 랜덤하게 변형을 선택
 */
function selectVariant(variants: string[], weights: number[]): string {
  const randomValue = Math.random();
  let cumulativeWeight = 0;

  for (let i = 0; i < weights.length; i++) {
    cumulativeWeight += weights[i];
    if (randomValue < cumulativeWeight) {
      return variants[i];
    }
  }

  return variants[0]; // 기본값으로 첫 번째 변형 반환
}

/**
 * 실험 쿠키 설정
 */
export function setExperimentCookie(
  experiments: Experiments
): Experiments | null {
  let updated = false;
  const result = { ...experiments };

  // 활성화된 각 실험에 대해 처리
  for (const experiment of ACTIVE_EXPERIMENTS) {
    // 아직 실험에 할당되지 않은 경우에만 변형 선택
    if (!result[experiment.name]) {
      result[experiment.name] = selectVariant(
        experiment.variants,
        experiment.weights
      );
      updated = true;
    }
  }

  return updated ? result : null;
}

/**
 * 현재 실험 변형 가져오기
 */
export function getExperimentVariant(
  experiments: Experiments,
  experimentName: string
): string | null {
  return experiments[experimentName] || null;
}

/**
 * 특정 실험의 변형에 사용자가 속하는지 확인
 */
export function isInVariant(
  experiments: Experiments,
  experimentName: string,
  variantName: string
): boolean {
  return experiments[experimentName] === variantName;
}

/**
 * 클라이언트에서 쿠키에서 실험 정보 가져오기
 */
export function getClientExperiments(): Experiments {
  if (typeof document === 'undefined') return {};

  try {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('ab-experiments='))
      ?.split('=')[1];

    if (cookieValue) {
      return JSON.parse(decodeURIComponent(cookieValue));
    }
  } catch (e) {
    logger(e);
  }

  return {};
}
