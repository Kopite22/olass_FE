import { analytics } from './AnalyticsManager';
import {
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

// React Hook 형태의 분석 도구
export const useAnalytics = () => {
  return {
    trackFormStart,
    trackFormStepComplete,
    trackFormSubmit,
    trackSalaryEntered,
    trackFOMOQuestionShown,
    trackFOMOQuestionAnswered,
    trackEmailSubmit,
    trackContentCTAClick,
    trackPageView,
    setUserProperties,
    trackCustomEvent,
    getDebugInfo: () => analytics.getDebugInfo(),
  };
};
