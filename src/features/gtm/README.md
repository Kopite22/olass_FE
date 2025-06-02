# GTM (Google Tag Manager) 모듈

이 문서는 GTM 데이터 레이어 관리 시스템의 사용법을 설명합니다.

## 📁 구조

```
src/features/gtm/
├── index.ts       # API exports (진입점)
├── types.ts       # GTM 이벤트 타입 정의
├── GTMManager.ts  # GTM 매니저 클래스
├── constants.ts   # GTM 이벤트 상수
└── README.md      # 문서
```

## 🚀 기본 사용법

### 1. GTM 매니저 인스턴스 사용

```tsx
import { gtmManager } from '@/features/gtm';

// 폼 시작 이벤트
gtmManager.trackFormStart('salary_comparison');

// 폼 단계 완료 이벤트
gtmManager.trackFormStepComplete('salary_comparison', 'personal_info', 1);

// 급여 입력 이벤트
gtmManager.trackSalaryEntered('25-30', 'developer', '5000-7000');
```

### 2. 직접 데이터 레이어 푸시

```tsx
import { gtmManager, type GTMEvent } from '@/features/gtm';

const customEvent: GTMEvent = {
  event: 'form_start',
  formName: 'salary_comparison',
};

gtmManager.push(customEvent);
```

### 3. 상수 사용

```tsx
import { GTM_EVENTS } from '@/features/gtm';

// 이벤트 이름 상수 사용
console.log(GTM_EVENTS.FORM_START); // 'form_start'
console.log(GTM_EVENTS.SALARY_ENTERED); // 'salary_entered'
```

## 📊 지원되는 이벤트

### 폼 관련 이벤트

- `trackFormStart(formName)` - 폼 시작
- `trackFormStepComplete(formName, stepName, stepNumber)` - 폼 단계 완료
- `trackFormSubmit(formName, totalSteps, completionTime?)` - 폼 제출 완료

### 사용자 데이터 이벤트

- `trackSalaryEntered(age, jobCategory, salaryRange)` - 급여 정보 입력

### FOMO 관련 이벤트

- `trackFOMOQuestionShown(questionType, userPercentile)` - FOMO 질문 표시
- `trackFOMOQuestionAnswered(questionType, answerValue, isBelowAverage, userPercentile)` - FOMO 질문 응답

### 컨텐츠 이벤트

- `trackEmailSubmit(contentInterest, userPercentile, source?)` - 이메일 제출
- `trackContentCTAClick(ctaType, contentType, position, targetUrl?)` - CTA 클릭

### 페이지 이벤트

- `trackPageView(pagePath, pageTitle, referrer?)` - 페이지 뷰

## 🏗️ 모듈 구조

### 1. **types.ts** - 타입 정의

```tsx
export interface BaseGTMEvent {
  event: string;
  [key: string]: any;
}

export interface FormStartEvent extends BaseGTMEvent {
  event: 'form_start';
  formName: string;
  timestamp?: string;
}

// ... 기타 이벤트 타입들

export type GTMEvent = FormStartEvent | FormStepCompleteEvent | ...;
```

### 2. **constants.ts** - 상수 정의

```tsx
export const GTM_EVENTS = {
  FORM_START: 'form_start',
  FORM_STEP_COMPLETE: 'form_step_complete',
  // ... 기타 이벤트들
} as const;

export type GTMEventType = (typeof GTM_EVENTS)[keyof typeof GTM_EVENTS];
```

### 3. **GTMManager.ts** - 메인 클래스

```tsx
export class GTMManager {
  push(event: GTMEvent): void;
  trackFormStart(formName: string): void;
  trackFormStepComplete(formName: string, stepName: string, stepNumber: number): void;
  // ... 기타 메서드들
  getDataLayerState(): Object[];
}

export const gtmManager = new GTMManager();
```

### 4. **index.ts** - API 진입점

```tsx
// 타입 exports
export type { BaseGTMEvent, FormStartEvent, ..., GTMEvent } from './types';

// 클래스 및 인스턴스 exports
export { GTMManager, gtmManager } from './GTMManager';

// 상수 exports
export { GTM_EVENTS, type GTMEventType } from './constants';
```

## 🎯 실제 사용 예제

### 폼 이벤트 추적

```tsx
import React, { useEffect, useState } from 'react';
import { gtmManager } from '@/features/gtm';

export default function SalaryForm() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // 폼 시작 시 이벤트 전송
    gtmManager.trackFormStart('salary_comparison');
  }, []);

  const handleStepComplete = (stepName: string) => {
    gtmManager.trackFormStepComplete('salary_comparison', stepName, currentStep + 1);
    setCurrentStep(prev => prev + 1);
  };

  const handleSalarySubmit = (age: string, jobCategory: string, salary: string) => {
    gtmManager.trackSalaryEntered(age, jobCategory, salary);
    handleStepComplete('salary_input');
  };

  return (
    <form>
      {/* 폼 컴포넌트 구현 */}
    </form>
  );
}
```

### 커스텀 이벤트 전송

```tsx
import { gtmManager, type GTMEvent } from '@/features/gtm';

// 타입 안전한 이벤트 생성
const createCustomEvent = (eventName: string, data: Record<string, any>): GTMEvent => {
  return {
    event: eventName,
    ...data,
  } as GTMEvent;
};

// 커스텀 이벤트 전송
const customEvent = createCustomEvent('user_interaction', {
  interactionType: 'button_click',
  buttonLabel: 'Get Started',
});

gtmManager.push(customEvent);
```

## 🔍 디버깅

### 데이터 레이어 상태 확인

```tsx
import { gtmManager } from '@/features/gtm';

// 현재 데이터 레이어 상태 확인
const dataLayerState = gtmManager.getDataLayerState();
console.log('GTM Data Layer:', dataLayerState);
```

### 개발자 도구에서 확인

개발 환경에서는 모든 GTM 이벤트가 콘솔에 로그됩니다:

```
GTM 이벤트 전송: {
  event: "form_start",
  formName: "salary_comparison",
  timestamp: "2024-01-01T00:00:00.000Z"
}
```

## 📝 주의사항

1. **GTM 초기화**: GTM 스크립트가 로드되기 전에는 이벤트가 전송되지 않습니다
2. **타임스탬프**: 모든 이벤트에 자동으로 ISO 8601 형식의 타임스탬프가 추가됩니다
3. **타입 안전성**: TypeScript를 사용하여 모든 이벤트의 타입이 보장됩니다
4. **브라우저 환경**: 서버 사이드에서는 GTM 이벤트가 전송되지 않습니다

## 🔧 문제 해결

### 이벤트가 전송되지 않는 경우

1. GTM 컨테이너가 올바르게 로드되었는지 확인
2. 브라우저 개발자 도구 콘솔에서 에러 메시지 확인
3. GTM 미리보기 모드에서 데이터 레이어 확인
4. `gtmManager.getDataLayerState()`로 현재 상태 확인

### 타입 에러가 발생하는 경우

이벤트 데이터의 타입을 확인하고, `types.ts`에 정의된 인터페이스를 참조하여 올바른 타입으로 전달하세요.

## 🚀 확장 방법

### 새로운 이벤트 타입 추가

1. **types.ts**에 새로운 이벤트 인터페이스 추가
2. **GTMEvent** 유니온 타입에 추가
3. **constants.ts**에 이벤트 상수 추가
4. **GTMManager.ts**에 추적 메서드 추가 (선택사항)

```tsx
// types.ts
export interface NewCustomEvent extends BaseGTMEvent {
  event: 'new_custom_event';
  customField: string;
}

export type GTMEvent = ... | NewCustomEvent;

// constants.ts
export const GTM_EVENTS = {
  // ... 기존 이벤트들
  NEW_CUSTOM_EVENT: 'new_custom_event',
} as const;

// GTMManager.ts
trackNewCustomEvent(customField: string): void {
  this.push({
    event: 'new_custom_event',
    customField,
  });
}
```
