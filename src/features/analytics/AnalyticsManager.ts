/* eslint-disable */
import { isProd } from '@/constant/env';
import { ga4Manager } from '@/features/ga';
import { gtmManager } from '@/features/gtm';

import type { AnalyticsConfig, DebugInfo } from './types';

// 기본 분석 설정
const defaultConfig: AnalyticsConfig = {
  enableGTM: true,
  enableGA4: true,
  debug: !isProd,
};

// 통합 분석 매니저
export class AnalyticsManager {
  private config: AnalyticsConfig;

  constructor(config: AnalyticsConfig = defaultConfig) {
    this.config = config;
  }

  /**
   * 설정 업데이트
   */
  updateConfig(newConfig: Partial<AnalyticsConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * 폼 시작 추적
   */
  trackFormStart(formName: string): void {
    this.debugLog('폼 시작 추적', { formName });

    if (this.config.enableGTM) {
      gtmManager.trackFormStart(formName);
    }

    if (this.config.enableGA4) {
      ga4Manager.trackFormStart(formName);
    }
  }

  /**
   * 폼 단계 완료 추적
   */
  trackFormStepComplete(
    formName: string,
    stepName: string,
    stepNumber: number
  ): void {
    this.debugLog('폼 단계 완료 추적', { formName, stepName, stepNumber });

    if (this.config.enableGTM) {
      gtmManager.trackFormStepComplete(formName, stepName, stepNumber);
    }

    if (this.config.enableGA4) {
      ga4Manager.trackFormStepComplete(formName, stepName, stepNumber);
    }
  }

  /**
   * 폼 제출 완료 추적
   */
  trackFormSubmit(
    formName: string,
    totalSteps: number,
    completionTime?: number
  ): void {
    this.debugLog('폼 제출 완료 추적', {
      formName,
      totalSteps,
      completionTime,
    });

    if (this.config.enableGTM) {
      gtmManager.trackFormSubmit(formName, totalSteps, completionTime);
    }

    if (this.config.enableGA4) {
      ga4Manager.trackFormSubmit(formName, totalSteps, completionTime);
    }
  }

  /**
   * 급여 입력 추적
   */
  trackSalaryEntered(
    age: string,
    jobCategory: string,
    salaryRange: string
  ): void {
    this.debugLog('급여 입력 추적', { age, jobCategory, salaryRange });

    if (this.config.enableGTM) {
      gtmManager.trackSalaryEntered(age, jobCategory, salaryRange);
    }

    if (this.config.enableGA4) {
      ga4Manager.trackSalaryEntered(age, jobCategory, salaryRange);
    }
  }

  /**
   * FOMO 질문 표시 추적
   */
  trackFOMOQuestionShown(questionType: string, userPercentile: number): void {
    this.debugLog('FOMO 질문 표시 추적', { questionType, userPercentile });

    if (this.config.enableGTM) {
      gtmManager.trackFOMOQuestionShown(questionType, userPercentile);
    }

    if (this.config.enableGA4) {
      ga4Manager.trackFOMOQuestionShown(questionType, userPercentile);
    }
  }

  /**
   * FOMO 질문 응답 추적
   */
  trackFOMOQuestionAnswered(
    questionType: string,
    answerValue: string,
    isBelowAverage: boolean,
    userPercentile: number
  ): void {
    this.debugLog('FOMO 질문 응답 추적', {
      questionType,
      answerValue,
      isBelowAverage,
      userPercentile,
    });

    if (this.config.enableGTM) {
      gtmManager.trackFOMOQuestionAnswered(
        questionType,
        answerValue,
        isBelowAverage,
        userPercentile
      );
    }

    if (this.config.enableGA4) {
      ga4Manager.trackFOMOQuestionAnswered(
        questionType,
        answerValue,
        isBelowAverage,
        userPercentile
      );
    }
  }

  /**
   * 이메일 제출 추적
   */
  trackEmailSubmit(
    contentInterest: string,
    userPercentile: number,
    source?: string
  ): void {
    this.debugLog('이메일 제출 추적', {
      contentInterest,
      userPercentile,
      source,
    });

    if (this.config.enableGTM) {
      gtmManager.trackEmailSubmit(contentInterest, userPercentile, source);
    }

    if (this.config.enableGA4) {
      ga4Manager.trackEmailSubmit(contentInterest, userPercentile, source);
    }
  }

  /**
   * 컨텐츠 CTA 클릭 추적
   */
  trackContentCTAClick(
    ctaType: string,
    contentType: string,
    position: string,
    targetUrl?: string
  ): void {
    this.debugLog('컨텐츠 CTA 클릭 추적', {
      ctaType,
      contentType,
      position,
      targetUrl,
    });

    if (this.config.enableGTM) {
      gtmManager.trackContentCTAClick(
        ctaType,
        contentType,
        position,
        targetUrl
      );
    }

    if (this.config.enableGA4) {
      ga4Manager.trackContentCTAClick(
        ctaType,
        contentType,
        position,
        targetUrl
      );
    }
  }

  /**
   * 페이지 뷰 추적
   */
  trackPageView(pagePath: string, pageTitle: string, referrer?: string): void {
    this.debugLog('페이지 뷰 추적', { pagePath, pageTitle, referrer });

    if (this.config.enableGTM) {
      gtmManager.trackPageView(pagePath, pageTitle, referrer);
    }

    if (this.config.enableGA4) {
      ga4Manager.trackCustomPageView(pagePath, pageTitle, referrer);
    }
  }

  /**
   * 사용자 속성 설정 (GA4만)
   */
  setUserProperties(properties: Record<string, string | number>): void {
    this.debugLog('사용자 속성 설정', properties);

    if (this.config.enableGA4) {
      ga4Manager.setUserProperties(properties);
    }
  }

  /**
   * 커스텀 이벤트 추적
   */
  trackCustomEvent(
    eventName: string,
    parameters: Record<string, string | number | boolean>
  ): void {
    this.debugLog('커스텀 이벤트 추적', { eventName, parameters });

    if (this.config.enableGA4) {
      ga4Manager.trackCustomEvent(eventName, parameters);
    }

    // GTM의 경우 커스텀 이벤트는 직접 데이터 레이어에 푸시
    if (this.config.enableGTM) {
      gtmManager.push({
        event: eventName,
        ...parameters,
      } as any);
    }
  }

  /**
   * 디버그 정보 가져오기
   */
  getDebugInfo(): DebugInfo {
    const debugInfo: DebugInfo = {
      config: this.config,
    };

    if (this.config.enableGTM) {
      debugInfo.gtmDataLayer = gtmManager.getDataLayerState();
    }

    return debugInfo;
  }

  /**
   * 디버그 로그
   */
  private debugLog(message: string, data?: unknown): void {
    if (this.config.debug) {
      // eslint-disable-next-line no-console
      console.log(`[Analytics] ${message}`, data);
    }
  }
}

// 전역 분석 매니저 인스턴스
export const analytics = new AnalyticsManager();
