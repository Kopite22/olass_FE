/* eslint-disable */

// GTM 데이터 레이어 이벤트 타입 정의
export interface BaseGTMEvent {
  event: string;
  [key: string]: any;
}

// 폼 관련 이벤트 타입
export interface FormStartEvent extends BaseGTMEvent {
  event: 'form_start';
  formName: string;
  timestamp?: string;
}

export interface FormStepCompleteEvent extends BaseGTMEvent {
  event: 'form_step_complete';
  formName: string;
  stepName: string;
  stepNumber: number;
  timestamp?: string;
}

export interface FormSubmitEvent extends BaseGTMEvent {
  event: 'form_submit';
  formName: string;
  totalSteps: number;
  completionTime?: number;
  timestamp?: string;
}

// 급여 입력 관련 이벤트
export interface SalaryEnteredEvent extends BaseGTMEvent {
  event: 'salary_entered';
  age: string;
  jobCategory: string;
  salaryRange: string;
  timestamp?: string;
}

// FOMO 질문 관련 이벤트
export interface FOMOQuestionShownEvent extends BaseGTMEvent {
  event: 'fomo_question_shown';
  questionType: string;
  userPercentile: number;
  timestamp?: string;
}

export interface FOMOQuestionAnsweredEvent extends BaseGTMEvent {
  event: 'fomo_question_answered';
  questionType: string;
  answerValue: string;
  isBelowAverage: boolean;
  userPercentile: number;
  timestamp?: string;
}

// 이메일 제출 이벤트
export interface EmailSubmitEvent extends BaseGTMEvent {
  event: 'email_submit';
  contentInterest: string;
  userPercentile: number;
  source?: string;
  timestamp?: string;
}

// 컨텐츠 CTA 클릭 이벤트
export interface ContentCTAClickEvent extends BaseGTMEvent {
  event: 'content_cta_click';
  ctaType: string;
  contentType: string;
  position: string;
  targetUrl?: string;
  timestamp?: string;
}

// 페이지 이벤트
export interface PageViewEvent extends BaseGTMEvent {
  event: 'page_view';
  pagePath: string;
  pageTitle: string;
  referrer?: string;
  timestamp?: string;
}

// 모든 GTM 이벤트 타입 유니온
export type GTMEvent =
  | FormStartEvent
  | FormStepCompleteEvent
  | FormSubmitEvent
  | SalaryEnteredEvent
  | FOMOQuestionShownEvent
  | FOMOQuestionAnsweredEvent
  | EmailSubmitEvent
  | ContentCTAClickEvent
  | PageViewEvent;
