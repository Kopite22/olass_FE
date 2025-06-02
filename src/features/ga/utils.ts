import { ga4Manager } from './GA4Manager';

// 편의 함수들
export const trackFormStart = (formName: string) =>
  ga4Manager.trackFormStart(formName);

export const trackFormStepComplete = (
  formName: string,
  stepName: string,
  stepNumber: number
) => ga4Manager.trackFormStepComplete(formName, stepName, stepNumber);

export const trackFormSubmit = (
  formName: string,
  totalSteps: number,
  completionTime?: number
) => ga4Manager.trackFormSubmit(formName, totalSteps, completionTime);

export const trackSalaryEntered = (
  age: string,
  jobCategory: string,
  salaryRange: string
) => ga4Manager.trackSalaryEntered(age, jobCategory, salaryRange);

export const trackFOMOQuestionShown = (
  questionType: string,
  userPercentile: number
) => ga4Manager.trackFOMOQuestionShown(questionType, userPercentile);

export const trackFOMOQuestionAnswered = (
  questionType: string,
  answerValue: string,
  isBelowAverage: boolean,
  userPercentile: number
) =>
  ga4Manager.trackFOMOQuestionAnswered(
    questionType,
    answerValue,
    isBelowAverage,
    userPercentile
  );

export const trackEmailSubmit = (
  contentInterest: string,
  userPercentile: number,
  source?: string
) => ga4Manager.trackEmailSubmit(contentInterest, userPercentile, source);

export const trackContentCTAClick = (
  ctaType: string,
  contentType: string,
  position: string,
  targetUrl?: string
) => ga4Manager.trackContentCTAClick(ctaType, contentType, position, targetUrl);

export const trackCustomPageView = (
  pagePath: string,
  pageTitle: string,
  referrer?: string
) => ga4Manager.trackCustomPageView(pagePath, pageTitle, referrer);

export const trackCustomEvent = (
  eventName: string,
  parameters: Record<string, string | number | boolean>
) => ga4Manager.trackCustomEvent(eventName, parameters);

export const setUserProperties = (
  properties: Record<string, string | number>
) => ga4Manager.setUserProperties(properties); 