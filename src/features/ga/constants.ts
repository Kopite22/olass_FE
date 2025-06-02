// GA4 이벤트 이름 상수
export const GA4_EVENTS = {
  FORM_START: 'form_start',
  FORM_STEP_COMPLETE: 'form_step_complete',
  FORM_SUBMIT: 'form_submit',
  SALARY_ENTERED: 'salary_entered',
  FOMO_QUESTION_SHOWN: 'fomo_question_shown',
  FOMO_QUESTION_ANSWERED: 'fomo_question_answered',
  EMAIL_SUBMIT: 'email_submit',
  CONTENT_CTA_CLICK: 'content_cta_click',
  CUSTOM_PAGE_VIEW: 'custom_page_view',
} as const;

export type GA4EventType = (typeof GA4_EVENTS)[keyof typeof GA4_EVENTS];
