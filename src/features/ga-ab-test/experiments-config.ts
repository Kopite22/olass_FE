// lib/experiments-config.ts
import { ExperimentConfig } from './abtest';

/**
 * 모든 A/B 테스트 실험 구성
 * 이 파일은 실험 설정의 중앙 관리를 위한 것입니다.
 */

// 테스트 유형 정의
export enum ExperimentType {
  PRODUCT_DETAIL = 'product-detail-redesign',
  HOMEPAGE_HERO = 'homepage-hero-redesign',
  CHECKOUT_FLOW = 'checkout-flow-redesign',
  // 추가 실험 타입을 여기에 정의
}

/**
 * 실험 설정 객체
 * - 각 실험에 대한 모든 설정을 한 곳에서 관리
 * - 새로운 실험 추가 또는 기존 실험 수정이 용이함
 */
export const EXPERIMENT_CONFIGS: Record<ExperimentType, ExperimentConfig> = {
  [ExperimentType.PRODUCT_DETAIL]: {
    name: ExperimentType.PRODUCT_DETAIL,
    variants: ['control', 'variant'],
    weights: [0.8, 0.2], // 80% 컨트롤, 20% 변형
    dimension: 'dimension2',
  },

  [ExperimentType.HOMEPAGE_HERO]: {
    name: ExperimentType.HOMEPAGE_HERO,
    variants: ['control', 'variant-a', 'variant-b'],
    weights: [0.7, 0.15, 0.15], // 70% 컨트롤, 15% 변형A, 15% 변형B
    dimension: 'dimension3',
  },

  [ExperimentType.CHECKOUT_FLOW]: {
    name: ExperimentType.CHECKOUT_FLOW,
    variants: ['control', 'one-step', 'multi-step'],
    weights: [0.6, 0.2, 0.2], // 60% 컨트롤, 20% 원스텝, 20% 멀티스텝
    dimension: 'dimension4',
  },
};

/**
 * 활성화된 실험 목록
 * - 이 배열에 있는 실험만 실행됨
 * - 실험을 비활성화하려면 이 배열에서 제거하기만 하면 됨
 */
export const ACTIVE_EXPERIMENTS: ExperimentConfig[] = [
  EXPERIMENT_CONFIGS[ExperimentType.PRODUCT_DETAIL],
  // 필요에 따라 다른 실험 활성화/비활성화
  // EXPERIMENT_CONFIGS[ExperimentType.HOMEPAGE_HERO],
  // EXPERIMENT_CONFIGS[ExperimentType.CHECKOUT_FLOW],
];

/**
 * 특정 경로에 대한 실험 적용 여부 결정
 * - 특정 경로에만 특정 실험을 적용하고 싶을 때 사용
 */
export function getExperimentsForPath(path: string): ExperimentConfig[] {
  // 제품 상세 페이지
  if (path.startsWith('/products/')) {
    return [EXPERIMENT_CONFIGS[ExperimentType.PRODUCT_DETAIL]];
  }

  // 홈페이지
  if (path === '/' || path === '') {
    return [EXPERIMENT_CONFIGS[ExperimentType.HOMEPAGE_HERO]];
  }

  // 체크아웃 페이지
  if (path.startsWith('/checkout')) {
    return [EXPERIMENT_CONFIGS[ExperimentType.CHECKOUT_FLOW]];
  }

  // 기본적으로 모든 활성 실험 반환
  return ACTIVE_EXPERIMENTS;
}
