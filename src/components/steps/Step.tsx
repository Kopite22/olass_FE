import React, { memo, ReactNode, useEffect } from 'react';

import { cn } from '@/lib/className';

import { useStep } from './useStep';

interface StepProps<T extends string = string> {
  name: T;
  children: ReactNode;
}

export const Step = memo(function Step<T extends string = string>({
  name,
  children,
}: StepProps<T>) {
  const { currentStep, registerStep } = useStep<T>();

  // 마운트 시 Steps 컴포넌트에 자신의 name 등록
  useEffect(() => {
    registerStep(name);
    // registerStep은 컨텍스트에서 제공되는 함수로 컴포넌트 라이프사이클 동안 안정적
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const isActive = currentStep === name;

  return (
    <div className={cn('size-full', !isActive && 'hidden')}>{children}</div>
  );
});
