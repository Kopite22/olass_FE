import { analytics } from './AnalyticsManager';

// 편의 함수들 (기존 코드와의 호환성을 위해)
export const trackFormStart = (formName: string) =>
  analytics.trackFormStart(formName);

export const trackFormStepComplete = (
  formName: string,
  stepName: string,
  stepNumber: number
) => analytics.trackFormStepComplete(formName, stepName, stepNumber);

export const trackFormSubmit = (
  formName: string,
  totalSteps: number,
  completionTime?: number
) => analytics.trackFormSubmit(formName, totalSteps, completionTime);

export const trackSalaryEntered = (
  age: string,
  jobCategory: string,
  salaryRange: string
) => analytics.trackSalaryEntered(age, jobCategory, salaryRange);

export const trackFOMOQuestionShown = (
  questionType: string,
  userPercentile: number
) => analytics.trackFOMOQuestionShown(questionType, userPercentile);

export const trackFOMOQuestionAnswered = (
  questionType: string,
  answerValue: string,
  isBelowAverage: boolean,
  userPercentile: number
) =>
  analytics.trackFOMOQuestionAnswered(
    questionType,
    answerValue,
    isBelowAverage,
    userPercentile
  );

export const trackEmailSubmit = (
  contentInterest: string,
  userPercentile: number,
  source?: string
) => analytics.trackEmailSubmit(contentInterest, userPercentile, source);

export const trackContentCTAClick = (
  ctaType: string,
  contentType: string,
  position: string,
  targetUrl?: string
) => analytics.trackContentCTAClick(ctaType, contentType, position, targetUrl);

export const trackPageView = (
  pagePath: string,
  pageTitle: string,
  referrer?: string
) => analytics.trackPageView(pagePath, pageTitle, referrer);

export const setUserProperties = (
  properties: Record<string, string | number>
) => analytics.setUserProperties(properties);

export const trackCustomEvent = (
  eventName: string,
  parameters: Record<string, string | number | boolean>
) => analytics.trackCustomEvent(eventName, parameters); 