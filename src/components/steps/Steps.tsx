import React, { ReactNode, useRef, useState } from 'react';

import { StepContext, StepContextProps } from './context';

interface StepsProps<T extends string = string> {
  children: ReactNode;
  initialStep: T;
  updateUrl?: boolean;
}

export function Steps<T extends string = string>({
  children,
  initialStep,
  updateUrl = true,
}: StepsProps<T>) {
  // 스텝 관리
  const steps = useRef<Set<T>>(new Set());
  const [currentStep, setCurrentStep] = useState<T>(initialStep);
  const [, setToggle] = useState(false);

  // 스텝 등록 함수
  const registerStep = (stepName: T) => {
    steps.current.add(stepName);

    setToggle((prev) => !prev);
  };

  // URL 상태 관리
  React.useEffect(() => {
    if (updateUrl && currentStep) {
      const url = new URL(window.location.href);
      url.searchParams.set('step', currentStep);
      window.history.pushState({ step: currentStep }, '', url.toString());
    }
  }, [currentStep, updateUrl]);

  // 뒤로가기 이벤트 처리
  React.useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.step && steps.current.has(event.state.step as T)) {
        setCurrentStep(event.state.step as T);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [steps]);

  const currentIndex = currentStep
    ? Array.from(steps.current).indexOf(currentStep)
    : -1;

  const next = () => {
    if (currentStep && currentIndex < steps.current.size - 1) {
      setCurrentStep(Array.from(steps.current)[currentIndex + 1]);
    }
  };

  const prev = () => {
    if (currentStep && currentIndex > 0) {
      setCurrentStep(Array.from(steps.current)[currentIndex - 1]);
    }
  };

  const goTo = (step: T) => {
    if (steps.current.has(step)) {
      setCurrentStep(step);
    }
  };

  const value: StepContextProps<T> = {
    currentStep,
    next,
    prev,
    goTo,
    steps: Array.from(steps.current),
    currentIndex,
    registerStep,
  };

  return (
    <StepContext.Provider value={value as unknown as StepContextProps<string>}>
      <div className='size-full'>{children}</div>
    </StepContext.Provider>
  );
}
