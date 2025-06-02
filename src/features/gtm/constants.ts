// GTM 이벤트 상수 정의
export const GTM_EVENTS = {
  FORM_START: 'form_start',
  FORM_STEP_COMPLETE: 'form_step_complete',
  FORM_SUBMIT: 'form_submit',
  SALARY_ENTERED: 'salary_entered',
  FOMO_QUESTION_SHOWN: 'fomo_question_shown',
  FOMO_QUESTION_ANSWERED: 'fomo_question_answered',
  EMAIL_SUBMIT: 'email_submit',
  CONTENT_CTA_CLICK: 'content_cta_click',
  PAGE_VIEW: 'page_view',
} as const;

export type GTMEventType = (typeof GTM_EVENTS)[keyof typeof GTM_EVENTS]; 