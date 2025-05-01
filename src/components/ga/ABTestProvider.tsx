// components/ABTestProvider.tsx
'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { Experiments, getClientExperiments } from '@/components/ga/abtest';
import {
  sendExperimentConversion,
  sendExperimentData,
} from '@/components/ga/analytics';

// A/B 테스트 컨텍스트 인터페이스
interface ABTestContextType {
  experiments: Experiments;
  isInVariant: (experimentName: string, variantName: string) => boolean;
  trackConversion:
    | ((
        experimentName: string,
        action: string,
        data?: Record<string, unknown>
      ) => void)
    | null;
  loading: boolean;
}

// 기본 컨텍스트 값
const defaultContextValue: ABTestContextType = {
  experiments: {},
  isInVariant: () => false,
  trackConversion: null,
  loading: true,
};

// A/B 테스트 컨텍스트 생성
const ABTestContext = createContext<ABTestContextType>(defaultContextValue);

// A/B 테스트 컨텍스트 훅
export const useABTest = () => useContext(ABTestContext);

interface ABTestProviderProps {
  children: ReactNode;
}

export default function ABTestProvider({ children }: ABTestProviderProps) {
  const [state, setState] = useState<ABTestContextType>(defaultContextValue);

  useEffect(() => {
    // 클라이언트 측에서만 실행
    if (typeof window !== 'undefined') {
      const experiments = getClientExperiments();

      // GA로 실험 데이터 전송
      sendExperimentData(experiments);

      setState({
        experiments,
        isInVariant: (experimentName, variantName) =>
          experiments[experimentName] === variantName,
        trackConversion: (experimentName, action, data = {}) => {
          const variantName = experiments[experimentName];
          if (variantName) {
            sendExperimentConversion(experimentName, variantName, action, data);
          }
        },
        loading: false,
      });
    }
  }, []);

  return (
    <ABTestContext.Provider value={state}>{children}</ABTestContext.Provider>
  );
}

// 실험에 따른 조건부 렌더링 컴포넌트
interface ABTestComponentProps {
  experimentName: string;
  variants: {
    [variant: string]: ReactNode;
  };
  defaultVariant?: string;
}

export function ABTestComponent({
  experimentName,
  variants,
  defaultVariant,
}: ABTestComponentProps) {
  const { experiments, loading } = useABTest();

  if (loading) {
    // 로딩 중에는 기본 변형 또는 첫 번째 변형을 표시
    const defaultKey = defaultVariant || Object.keys(variants)[0];
    return <>{variants[defaultKey]}</>;
  }

  const activeVariant = experiments[experimentName];

  // 활성 변형이 있고 해당 렌더링 컴포넌트가 제공된 경우
  if (activeVariant && variants[activeVariant]) {
    return <>{variants[activeVariant]}</>;
  }

  // 기본 변형 또는 첫 번째 변형으로 폴백
  const fallbackKey = defaultVariant || Object.keys(variants)[0];
  return <>{variants[fallbackKey]}</>;
}
