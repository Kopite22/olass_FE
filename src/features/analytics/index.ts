// === 타입 exports ===
export type { AnalyticsConfig, DebugInfo } from './types';

// === 클래스 및 인스턴스 exports ===
export { analytics,AnalyticsManager } from './AnalyticsManager';

// === Hook exports ===
export { useAnalytics } from './hooks';

// === 편의 함수 exports ===
export {
  setUserProperties,
  trackContentCTAClick,
  trackCustomEvent,
  trackEmailSubmit,
  trackFOMOQuestionAnswered,
  trackFOMOQuestionShown,
  trackFormStart,
  trackFormStepComplete,
  trackFormSubmit,
  trackPageView,
  trackSalaryEntered,
} from './utils';

// === 상수 exports ===
export { GA4_EVENTS } from '@/features/ga'; 
export { GTM_EVENTS } from '@/features/gtm';