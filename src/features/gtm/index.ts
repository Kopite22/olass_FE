// === 타입 exports ===
export type {
  BaseGTMEvent,
  ContentCTAClickEvent,
  EmailSubmitEvent,
  FOMOQuestionAnsweredEvent,
  FOMOQuestionShownEvent,
  FormStartEvent,
  FormStepCompleteEvent,
  FormSubmitEvent,
  GTMEvent,
  PageViewEvent,
  SalaryEnteredEvent,
} from './types';

// === 클래스 및 인스턴스 exports ===
export { GTMManager, gtmManager } from './GTMManager';

// === 상수 exports ===
export { type GTMEventType, GTM_EVENTS } from './constants';
