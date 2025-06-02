/* eslint-disable */
import { sendGAEvent } from '@next/third-parties/google';

import { GA4_EVENTS } from './constants';
import type {
  BaseGA4EventParams,
  ContentCTAClickParams,
  CustomPageViewParams,
  EmailSubmitParams,
  FormSubmitParams,
} from './types';

// GA4 이벤트 관리 클래스
export class GA4Manager {
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = typeof window !== 'undefined';
  }

  /**
   * 폼 시작 이벤트
   */
  trackFormStart(formName: string): void {
    this.sendEvent(GA4_EVENTS.FORM_START, {
      form_name: formName,
    });
  }

  /**
   * 폼 단계 완료 이벤트
   */
  trackFormStepComplete(
    formName: string,
    stepName: string,
    stepNumber: number
  ): void {
    this.sendEvent(GA4_EVENTS.FORM_STEP_COMPLETE, {
      form_name: formName,
      step_name: stepName,
      step_number: stepNumber,
    });
  }

  /**
   * 폼 제출 완료 이벤트
   */
  trackFormSubmit(
    formName: string,
    totalSteps: number,
    completionTime?: number
  ): void {
    const params: FormSubmitParams = {
      form_name: formName,
      total_steps: totalSteps,
    };

    if (completionTime) {
      params.completion_time = completionTime;
    }

    this.sendEvent(GA4_EVENTS.FORM_SUBMIT, params);
  }

  /**
   * 급여 입력 이벤트
   */
  trackSalaryEntered(
    age: string,
    jobCategory: string,
    salaryRange: string
  ): void {
    this.sendEvent(GA4_EVENTS.SALARY_ENTERED, {
      age,
      job_category: jobCategory,
      salary_range: salaryRange,
    });
  }

  /**
   * FOMO 질문 표시 이벤트
   */
  trackFOMOQuestionShown(questionType: string, userPercentile: number): void {
    this.sendEvent(GA4_EVENTS.FOMO_QUESTION_SHOWN, {
      question_type: questionType,
      user_percentile: userPercentile,
    });
  }

  /**
   * FOMO 질문 응답 이벤트
   */
  trackFOMOQuestionAnswered(
    questionType: string,
    answerValue: string,
    isBelowAverage: boolean,
    userPercentile: number
  ): void {
    this.sendEvent(GA4_EVENTS.FOMO_QUESTION_ANSWERED, {
      question_type: questionType,
      answer_value: answerValue,
      is_below_average: isBelowAverage,
      user_percentile: userPercentile,
    });
  }

  /**
   * 이메일 제출 이벤트
   */
  trackEmailSubmit(
    contentInterest: string,
    userPercentile: number,
    source?: string
  ): void {
    const params: EmailSubmitParams = {
      content_interest: contentInterest,
      user_percentile: userPercentile,
    };

    if (source) {
      params.source = source;
    }

    this.sendEvent(GA4_EVENTS.EMAIL_SUBMIT, params);
  }

  /**
   * 컨텐츠 CTA 클릭 이벤트
   */
  trackContentCTAClick(
    ctaType: string,
    contentType: string,
    position: string,
    targetUrl?: string
  ): void {
    const params: ContentCTAClickParams = {
      cta_type: ctaType,
      content_type: contentType,
      position,
    };

    if (targetUrl) {
      params.target_url = targetUrl;
    }

    this.sendEvent(GA4_EVENTS.CONTENT_CTA_CLICK, params);
  }

  /**
   * 커스텀 페이지 뷰 이벤트
   */
  trackCustomPageView(
    pagePath: string,
    pageTitle: string,
    referrer?: string
  ): void {
    const params: CustomPageViewParams = {
      page_path: pagePath,
      page_title: pageTitle,
    };

    if (referrer) {
      params.referrer = referrer;
    }

    this.sendEvent(GA4_EVENTS.CUSTOM_PAGE_VIEW, params);
  }

  /**
   * 커스텀 이벤트 전송
   */
  trackCustomEvent(eventName: string, parameters: BaseGA4EventParams): void {
    this.sendEvent(eventName, parameters);
  }

  /**
   * 사용자 속성 설정
   */
  setUserProperties(properties: Record<string, string | number>): void {
    if (!this.isEnabled) {
      console.warn('GA4가 초기화되지 않았습니다.');
      return;
    }

    try {
      sendGAEvent('set', 'user_properties', properties);
      console.log('GA4 사용자 속성 설정:', properties);
    } catch (error) {
      console.error('GA4 사용자 속성 설정 실패:', error);
    }
  }

  /**
   * GA4 이벤트 전송
   */
  private sendEvent(eventName: string, parameters: BaseGA4EventParams): void {
    if (!this.isEnabled) {
      console.warn('GA4가 초기화되지 않았습니다.');
      return;
    }

    // 타임스탬프 자동 추가
    const paramsWithTimestamp = {
      ...parameters,
      timestamp: new Date().toISOString(),
    };

    try {
      sendGAEvent('event', eventName, paramsWithTimestamp);
      console.log('GA4 이벤트 전송:', eventName, paramsWithTimestamp);
    } catch (error) {
      console.error('GA4 이벤트 전송 실패:', error);
    }
  }
}

// GA4 매니저 인스턴스 생성 및 내보내기
export const ga4Manager = new GA4Manager();
