// === 타입 exports ===
export type {
  BaseGA4EventParams,
  ContentCTAClickParams,
  CustomPageViewParams,
  EmailSubmitParams,
  FOMOQuestionAnsweredParams,
  FOMOQuestionShownParams,
  FormStartParams,
  FormStepCompleteParams,
  FormSubmitParams,
  SalaryEnteredParams,
} from './types';

// === 클래스 및 인스턴스 exports ===
export { GA4Manager, ga4Manager } from './GA4Manager';

// === 편의 함수 exports ===
export {
  setUserProperties,
  trackContentCTAClick,
  trackCustomEvent,
  trackCustomPageView,
  trackEmailSubmit,
  trackFOMOQuestionAnswered,
  trackFOMOQuestionShown,
  trackFormStart,
  trackFormStepComplete,
  trackFormSubmit,
  trackSalaryEntered,
} from './utils';

// === 상수 exports ===
export { type GA4EventType, GA4_EVENTS } from './constants';
