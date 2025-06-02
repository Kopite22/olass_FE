# GA4 (Google Analytics 4) 모듈

이 문서는 GA4 이벤트 추적 시스템의 사용법을 설명합니다.

## 📁 구조

```
src/features/ga/
├── index.ts       # API exports (진입점)
├── types.ts       # GA4 이벤트 파라미터 타입 정의
├── GA4Manager.ts  # GA4 매니저 클래스
├── constants.ts   # GA4 이벤트 상수
├── utils.ts       # 편의 함수들
└── README.md      # 문서
```

## 🚀 기본 사용법

### 1. GA4 매니저 인스턴스 사용

```tsx
import { ga4Manager } from '@/features/ga';

// 폼 시작 이벤트
ga4Manager.trackFormStart('salary_comparison');

// 폼 단계 완료 이벤트
ga4Manager.trackFormStepComplete('salary_comparison', 'personal_info', 1);

// 급여 입력 이벤트
ga4Manager.trackSalaryEntered('25-30', 'developer', '5000-7000');
```

### 2. 편의 함수 사용

```tsx
import { 
  trackFormStart, 
  trackSalaryEntered,
  setUserProperties 
} from '@/features/ga';

// 편의 함수로 이벤트 전송
trackFormStart('salary_comparison');
trackSalaryEntered('25-30', 'developer', '5000-7000');

// 사용자 속성 설정
setUserProperties({
  user_age_group: '25-30',
  user_job_category: 'developer'
});
```

### 3. 상수 사용

```tsx
import { GA4_EVENTS } from '@/features/ga';

// 이벤트 이름 상수 사용
console.log(GA4_EVENTS.FORM_START); // 'form_start'
console.log(GA4_EVENTS.SALARY_ENTERED); // 'salary_entered'
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

- `trackCustomPageView(pagePath, pageTitle, referrer?)` - 커스텀 페이지 뷰

### 기타

- `setUserProperties(properties)` - 사용자 속성 설정
- `trackCustomEvent(eventName, parameters)` - 커스텀 이벤트

## 🏗️ 모듈 구조

### 1. **types.ts** - 타입 정의

```tsx
export interface BaseGA4EventParams {
  [key: string]: string | number | boolean | undefined;
}

export interface FormStartParams extends BaseGA4EventParams {
  form_name: string;
  timestamp?: string;
}

// ... 기타 이벤트 파라미터 타입들
```

### 2. **constants.ts** - 상수 정의

```tsx
export const GA4_EVENTS = {
  FORM_START: 'form_start',
  FORM_STEP_COMPLETE: 'form_step_complete',
  // ... 기타 이벤트들
} as const;

export type GA4EventType = (typeof GA4_EVENTS)[keyof typeof GA4_EVENTS];
```

### 3. **GA4Manager.ts** - 메인 클래스

```tsx
export class GA4Manager {
  trackFormStart(formName: string): void;
  trackFormStepComplete(formName: string, stepName: string, stepNumber: number): void;
  // ... 기타 메서드들
  setUserProperties(properties: Record<string, string | number>): void;
}

export const ga4Manager = new GA4Manager();
```

### 4. **utils.ts** - 편의 함수들

```tsx
export const trackFormStart = (formName: string) => ga4Manager.trackFormStart(formName);
export const trackFormStepComplete = (...) => ga4Manager.trackFormStepComplete(...);
// ... 기타 편의 함수들
```

### 5. **index.ts** - API 진입점

```tsx
// 타입 exports
export type { BaseGA4EventParams, FormStartParams, ... } from './types';

// 클래스 및 인스턴스 exports
export { GA4Manager, ga4Manager } from './GA4Manager';

// 편의 함수 exports
export { trackFormStart, trackFormStepComplete, ... } from './utils';

// 상수 exports
export { GA4_EVENTS, type GA4EventType } from './constants';
```

## 🎯 실제 사용 예제

### 폼 이벤트 추적

```tsx
import React, { useEffect, useState } from 'react';
import { ga4Manager } from '@/features/ga';

export default function SalaryForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [startTime, setStartTime] = useState<number>();

  useEffect(() => {
    // 폼 시작 시 이벤트 전송
    ga4Manager.trackFormStart('salary_comparison');
    setStartTime(Date.now());
  }, []);

  const handleStepComplete = (stepName: string) => {
    ga4Manager.trackFormStepComplete('salary_comparison', stepName, currentStep + 1);
    setCurrentStep(prev => prev + 1);
  };

  const handleFormComplete = () => {
    const completionTime = startTime ? Date.now() - startTime : undefined;
    ga4Manager.trackFormSubmit('salary_comparison', 3, completionTime);
  };

  return (
    <form>
      {/* 폼 컴포넌트 구현 */}
    </form>
  );
}
```

### 사용자 속성 설정

```tsx
import { setUserProperties } from '@/features/ga';

// 사용자 정보가 확정되면 속성 설정
const handleUserDataComplete = (userData: UserData) => {
  setUserProperties({
    user_age_group: userData.age,
    user_job_category: userData.jobCategory,
    user_salary_range: userData.salaryRange,
    user_signup_date: new Date().toISOString().split('T')[0]
  });
};
```

### 커스텀 이벤트 전송

```tsx
import { trackCustomEvent, type BaseGA4EventParams } from '@/features/ga';

// 특별한 사용자 행동 추적
const trackSpecialAction = (actionType: string, details: Record<string, any>) => {
  const eventParams: BaseGA4EventParams = {
    action_type: actionType,
    ...details,
  };
  
  trackCustomEvent('special_user_action', eventParams);
};

// 사용 예시
trackSpecialAction('advanced_calculation_used', {
  calculation_type: 'retirement_planning',
  input_values_count: 5,
  result_accuracy: 'high'
});
```

## 🔍 디버깅

### 개발자 도구에서 확인

개발 환경에서는 모든 GA4 이벤트가 콘솔에 로그됩니다:

```
GA4 이벤트 전송: form_start {
  form_name: "salary_comparison",
  timestamp: "2024-01-01T00:00:00.000Z"
}
```

### Real-time 보고서 확인

GA4의 실시간 보고서에서 이벤트 수신을 즉시 확인할 수 있습니다:

1. GA4 대시보드 → 보고서 → 실시간
2. 이벤트 섹션에서 커스텀 이벤트 확인

## 📝 주의사항

1. **GA4 초기화**: Next.js third-parties 라이브러리를 통해 GA4가 로드됩니다
2. **파라미터 네이밍**: GA4는 snake_case를 사용합니다 (form_name, step_number 등)
3. **타임스탬프**: 모든 이벤트에 자동으로 ISO 8601 형식의 타임스탬프가 추가됩니다
4. **브라우저 환경**: 서버 사이드에서는 GA4 이벤트가 전송되지 않습니다
5. **파라미터 제한**: GA4는 이벤트당 최대 25개의 커스텀 파라미터를 허용합니다

## 🔧 문제 해결

### 이벤트가 전송되지 않는 경우

1. GA4 measurement ID가 올바르게 설정되었는지 확인
2. 브라우저 개발자 도구 콘솔에서 에러 메시지 확인
3. GA4 실시간 보고서에서 이벤트 수신 확인
4. 네트워크 탭에서 GA4 요청 확인

### 타입 에러가 발생하는 경우

이벤트 파라미터의 타입을 확인하고, `types.ts`에 정의된 인터페이스를 참조하여 올바른 타입으로 전달하세요.

### Enhanced Ecommerce 설정

```tsx
// 예시: 구매 완료 이벤트
trackCustomEvent('purchase', {
  transaction_id: 'T12345',
  value: 25.42,
  currency: 'USD',
  items: [
    {
      item_id: 'SKU123',
      item_name: 'Premium Analysis',
      category: 'Service',
      quantity: 1,
      price: 25.42
    }
  ]
});
```

## 🚀 확장 방법

### 새로운 이벤트 파라미터 타입 추가

1. **types.ts**에 새로운 파라미터 인터페이스 추가
2. **constants.ts**에 이벤트 상수 추가 (필요한 경우)
3. **GA4Manager.ts**에 추적 메서드 추가 (선택사항)
4. **utils.ts**에 편의 함수 추가 (선택사항)

```tsx
// types.ts
export interface NewFeatureParams extends BaseGA4EventParams {
  feature_name: string;
  usage_duration: number;
  success_rate: number;
}

// constants.ts
export const GA4_EVENTS = {
  // ... 기존 이벤트들
  NEW_FEATURE_USED: 'new_feature_used',
} as const;

// GA4Manager.ts
trackNewFeatureUsage(featureName: string, duration: number, successRate: number): void {
  this.sendEvent(GA4_EVENTS.NEW_FEATURE_USED, {
    feature_name: featureName,
    usage_duration: duration,
    success_rate: successRate,
  });
}

// utils.ts
export const trackNewFeatureUsage = (
  featureName: string, 
  duration: number, 
  successRate: number
) => ga4Manager.trackNewFeatureUsage(featureName, duration, successRate);
```
