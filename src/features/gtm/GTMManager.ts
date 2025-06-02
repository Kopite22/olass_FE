/* eslint-disable */
import type { GTMEvent } from './types';

// 글로벌 타입 확장
declare global {
  interface Window {
    dataLayer?: Object[];
  }
}

// GTM 데이터 레이어 관리 클래스
export class GTMManager {
  private isEnabled: boolean;

  constructor() {
    this.isEnabled = typeof window !== 'undefined' && !!window.dataLayer;
  }

  /**
   * 데이터 레이어에 이벤트 푸시
   */
  push(event: GTMEvent): void {
    if (!this.isEnabled || typeof window === 'undefined' || !window.dataLayer) {
      console.warn('GTM이 초기화되지 않았습니다.');
      return;
    }

    // 타임스탬프 자동 추가
    const eventWithTimestamp = {
      ...event,
      timestamp: new Date().toISOString(),
    };

    try {
      window.dataLayer.push(eventWithTimestamp);
      console.log('GTM 이벤트 전송:', eventWithTimestamp);
    } catch (error) {
      console.error('GTM 이벤트 전송 실패:', error);
    }
  }

  /**
   * 폼 시작 이벤트
   */
  trackFormStart(formName: string): void {
    this.push({
      event: 'form_start',
      formName,
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
    this.push({
      event: 'form_step_complete',
      formName,
      stepName,
      stepNumber,
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
    this.push({
      event: 'form_submit',
      formName,
      totalSteps,
      completionTime,
    });
  }

  /**
   * 급여 입력 이벤트
   */
  trackSalaryEntered(
    age: string,
    jobCategory: string,
    salaryRange: string
  ): void {
    this.push({
      event: 'salary_entered',
      age,
      jobCategory,
      salaryRange,
    });
  }

  /**
   * FOMO 질문 표시 이벤트
   */
  trackFOMOQuestionShown(questionType: string, userPercentile: number): void {
    this.push({
      event: 'fomo_question_shown',
      questionType,
      userPercentile,
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
    this.push({
      event: 'fomo_question_answered',
      questionType,
      answerValue,
      isBelowAverage,
      userPercentile,
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
    this.push({
      event: 'email_submit',
      contentInterest,
      userPercentile,
      source,
    });
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
    this.push({
      event: 'content_cta_click',
      ctaType,
      contentType,
      position,
      targetUrl,
    });
  }

  /**
   * 커스텀 페이지 뷰 이벤트
   */
  trackPageView(pagePath: string, pageTitle: string, referrer?: string): void {
    this.push({
      event: 'page_view',
      pagePath,
      pageTitle,
      referrer,
    });
  }

  /**
   * 디버그 모드에서 데이터 레이어 상태 확인
   */
  getDataLayerState(): Object[] {
    if (!this.isEnabled || typeof window === 'undefined' || !window.dataLayer) {
      return [];
    }
    return window.dataLayer;
  }
}

// GTM 매니저 인스턴스 생성 및 내보내기
export const gtmManager = new GTMManager();
