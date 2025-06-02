# Ollass v2 GTM/GA4 분석 시스템

이 문서는 Ollass v2에서 GTM(Google Tag Manager)과 GA4(Google Analytics 4)를 사용한 로깅 환경의 사용법을 설명합니다.

## 📁 구조

```
src/features/
├── gtm/                    # GTM 데이터 레이어 관리
├── ga/                     # GA4 이벤트 추적
└── analytics/              # 통합 분석 시스템
    ├── index.ts            # API exports (진입점)
    ├── types.ts            # 타입 정의
    ├── AnalyticsManager.ts # 메인 분석 매니저 클래스
    ├── utils.ts            # 편의 함수들
    ├── hooks.ts            # React Hook
    └── README.md           # 문서
```

## 🚀 기본 사용법

### 1. 기본 이벤트 추적

```tsx
import { analytics } from '@/features/analytics';

// 폼 시작 추적
analytics.trackFormStart('salary_comparison');

// 폼 단계 완료 추적
analytics.trackFormStepComplete('salary_comparison', 'personal_info', 1);

// 급여 입력 추적
analytics.trackSalaryEntered('25-30', 'developer', '5000-7000');
```

### 2. React Hook 사용

```tsx
import { useAnalytics } from '@/features/analytics';

function MyComponent() {
  const { trackFormStart, trackFormStepComplete } = useAnalytics();

  const handleStartForm = () => {
    trackFormStart('salary_comparison');
  };

  return (
    <button onClick={handleStartForm}>
      폼 시작하기
    </button>
  );
}
```

### 3. 개별 함수 임포트

```tsx
import { 
  trackFormStart, 
  trackSalaryEntered,
  trackEmailSubmit 
} from '@/features/analytics';

// 직접 함수 호출
trackFormStart('salary_comparison');
trackSalaryEntered('25-30', 'developer', '5000-7000');
trackEmailSubmit('salary_insights', 75, 'form');
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

### 기타

- `setUserProperties(properties)` - 사용자 속성 설정 (GA4만)
- `trackCustomEvent(eventName, parameters)` - 커스텀 이벤트

## ⚙️ 설정

### 분석 설정 변경

```tsx
import { analytics } from '@/features/analytics';

// GTM만 사용
analytics.updateConfig({
  enableGTM: true,
  enableGA4: false,
  debug: true
});

// GA4만 사용
analytics.updateConfig({
  enableGTM: false,
  enableGA4: true,
  debug: false
});
```

### 환경별 설정

기본적으로 다음과 같이 설정됩니다:

- **개발 환경**: debug 모드 활성화
- **프로덕션 환경**: debug 모드 비활성화
- **GTM과 GA4**: 모두 활성화

## 🔍 디버깅

### 디버그 정보 확인

```tsx
import { analytics } from '@/features/analytics';

// 현재 설정과 데이터 레이어 상태 확인
const debugInfo = analytics.getDebugInfo();
console.log(debugInfo);
```

### 개발자 도구에서 확인

개발 환경에서는 모든 이벤트가 콘솔에 로그됩니다:

```
[Analytics] 폼 시작 추적 {formName: "salary_comparison"}
GTM 이벤트 전송: {event: "form_start", formName: "salary_comparison", timestamp: "2024-01-01T00:00:00.000Z"}
GA4 이벤트 전송: form_start {form_name: "salary_comparison", timestamp: "2024-01-01T00:00:00.000Z"}
```

## 🏗️ 모듈 구조

### 1. **types.ts** - 타입 정의

```tsx
export interface AnalyticsConfig {
  enableGTM: boolean;
  enableGA4: boolean;
  debug: boolean;
}

export interface DebugInfo {
  config: AnalyticsConfig;
  gtmDataLayer?: Object[];
}
```

### 2. **AnalyticsManager.ts** - 메인 클래스

```tsx
export class AnalyticsManager {
  trackFormStart(formName: string): void;
  trackFormStepComplete(formName: string, stepName: string, stepNumber: number): void;
  // ... 기타 메서드들
}

export const analytics = new AnalyticsManager();
```

### 3. **utils.ts** - 편의 함수들

```tsx
export const trackFormStart = (formName: string) => analytics.trackFormStart(formName);
export const trackFormStepComplete = (...) => analytics.trackFormStepComplete(...);
// ... 기타 편의 함수들
```

### 4. **hooks.ts** - React Hook

```tsx
export const useAnalytics = () => {
  return {
    trackFormStart,
    trackFormStepComplete,
    // ... 모든 추적 함수들
    getDebugInfo: () => analytics.getDebugInfo(),
  };
};
```

### 5. **index.ts** - API 진입점

```tsx
// 타입 exports
export type { AnalyticsConfig, DebugInfo } from './types';

// 클래스 및 인스턴스 exports
export { AnalyticsManager, analytics } from './AnalyticsManager';

// Hook exports
export { useAnalytics } from './hooks';

// 편의 함수 exports
export { trackFormStart, trackFormStepComplete, ... } from './utils';

// 상수 exports
export { GTM_EVENTS } from '@/features/gtm';
export { GA4_EVENTS } from '@/features/ga';
```

## 🎯 실제 사용 예제

### 급여 비교 폼 구현

```tsx
import React, { useState, useEffect } from 'react';
import { useAnalytics } from '@/features/analytics';

export default function SalaryComparisonForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [startTime, setStartTime] = useState<number>();
  
  const { 
    trackFormStart, 
    trackFormStepComplete, 
    trackFormSubmit,
    trackSalaryEntered 
  } = useAnalytics();

  // 폼 시작 시
  useEffect(() => {
    trackFormStart('salary_comparison');
    setStartTime(Date.now());
  }, []);

  // 단계 완료 시
  const handleStepComplete = (stepName: string) => {
    trackFormStepComplete('salary_comparison', stepName, currentStep + 1);
    setCurrentStep(prev => prev + 1);
  };

  // 급여 입력 시
  const handleSalarySubmit = (age: string, jobCategory: string, salary: string) => {
    trackSalaryEntered(age, jobCategory, salary);
    handleStepComplete('salary_input');
  };

  // 폼 완료 시
  const handleFormComplete = () => {
    const completionTime = startTime ? Date.now() - startTime : undefined;
    trackFormSubmit('salary_comparison', 3, completionTime);
  };

  return (
    <form>
      {/* 폼 컴포넌트 구현 */}
    </form>
  );
}
```

### FOMO 질문 컴포넌트

```tsx
import React, { useEffect } from 'react';
import { useAnalytics } from '@/features/analytics';

interface FOMOQuestionProps {
  questionType: string;
  userPercentile: number;
  onAnswer: (answer: string) => void;
}

export default function FOMOQuestion({ 
  questionType, 
  userPercentile, 
  onAnswer 
}: FOMOQuestionProps) {
  const { trackFOMOQuestionShown, trackFOMOQuestionAnswered } = useAnalytics();

  useEffect(() => {
    trackFOMOQuestionShown(questionType, userPercentile);
  }, [questionType, userPercentile]);

  const handleAnswer = (answer: string) => {
    const isBelowAverage = userPercentile < 50;
    trackFOMOQuestionAnswered(questionType, answer, isBelowAverage, userPercentile);
    onAnswer(answer);
  };

  return (
    <div>
      <h3>당신의 저축률은 상위 {100 - userPercentile}%입니다</h3>
      <button onClick={() => handleAnswer('increase_savings')}>
        저축을 늘리고 싶어요
      </button>
      <button onClick={() => handleAnswer('satisfied')}>
        현재 만족해요
      </button>
    </div>
  );
}
```

## 🏗️ GTM 설정 가이드

### 필요한 GTM 트리거

1. **Form Start Trigger**
   - 트리거 유형: 커스텀 이벤트
   - 이벤트 이름: `form_start`

2. **Form Step Complete Trigger**
   - 트리거 유형: 커스텀 이벤트
   - 이벤트 이름: `form_step_complete`

3. **FOMO Question Trigger**
   - 트리거 유형: 커스텀 이벤트
   - 이벤트 이름: `fomo_question_shown`

### 필요한 GTM 변수

- `formName` (데이터 레이어 변수)
- `stepName` (데이터 레이어 변수)
- `stepNumber` (데이터 레이어 변수)
- `questionType` (데이터 레이어 변수)
- `userPercentile` (데이터 레이어 변수)

### GA4 태그 설정

각 GTM 트리거에 대응하는 GA4 이벤트 태그를 생성하고, 데이터 레이어 변수를 이벤트 파라미터로 매핑합니다.

## 📝 주의사항

1. **환경 변수 설정**: `GA_MEASUREMENT_ID`와 `GOOGLE_TAG_MANAGER_ID`가 올바르게 설정되어 있는지 확인
2. **타임스탬프**: 모든 이벤트에 자동으로 ISO 8601 형식의 타임스탬프가 추가됩니다
3. **타입 안전성**: TypeScript를 사용하여 모든 이벤트 파라미터의 타입이 보장됩니다
4. **디버깅**: 개발 환경에서는 모든 이벤트가 콘솔에 로그되므로 실시간 확인이 가능합니다
5. **모듈 분리**: 각 기능별로 모듈이 분리되어 있어 유지보수와 확장이 용이합니다

## 🔧 문제 해결

### 이벤트가 전송되지 않는 경우

1. 브라우저 개발자 도구 콘솔 확인
2. GTM 미리보기 모드에서 데이터 레이어 확인
3. GA4 실시간 보고서에서 이벤트 수신 확인
4. `analytics.getDebugInfo()`로 현재 상태 확인

### 타입 에러가 발생하는 경우

이벤트 파라미터의 타입을 확인하고, 필요한 경우 `types.ts`에 정의된 인터페이스를 참조하여 올바른 타입으로 전달하세요.

### 모듈 import 에러가 발생하는 경우

`index.ts`를 통해 모든 API가 노출되므로, 항상 `@/features/analytics`에서 import하세요.
