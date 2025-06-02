// GA4 이벤트 파라미터 타입 정의
export interface BaseGA4EventParams {
  [key: string]: string | number | boolean | undefined;
}

// 폼 관련 이벤트 파라미터
export interface FormStartParams extends BaseGA4EventParams {
  form_name: string;
  timestamp?: string;
}

export interface FormStepCompleteParams extends BaseGA4EventParams {
  form_name: string;
  step_name: string;
  step_number: number;
  timestamp?: string;
}

export interface FormSubmitParams extends BaseGA4EventParams {
  form_name: string;
  total_steps: number;
  completion_time?: number;
  timestamp?: string;
}

// 급여 입력 이벤트 파라미터
export interface SalaryEnteredParams extends BaseGA4EventParams {
  age: string;
  job_category: string;
  salary_range: string;
  timestamp?: string;
}

// FOMO 질문 이벤트 파라미터
export interface FOMOQuestionShownParams extends BaseGA4EventParams {
  question_type: string;
  user_percentile: number;
  timestamp?: string;
}

export interface FOMOQuestionAnsweredParams extends BaseGA4EventParams {
  question_type: string;
  answer_value: string;
  is_below_average: boolean;
  user_percentile: number;
  timestamp?: string;
}

// 이메일 제출 이벤트 파라미터
export interface EmailSubmitParams extends BaseGA4EventParams {
  content_interest: string;
  user_percentile: number;
  source?: string;
  timestamp?: string;
}

// 컨텐츠 CTA 클릭 이벤트 파라미터
export interface ContentCTAClickParams extends BaseGA4EventParams {
  cta_type: string;
  content_type: string;
  position: string;
  target_url?: string;
  timestamp?: string;
}

// 페이지 뷰 이벤트 파라미터
export interface CustomPageViewParams extends BaseGA4EventParams {
  page_path: string;
  page_title: string;
  referrer?: string;
  timestamp?: string;
} 