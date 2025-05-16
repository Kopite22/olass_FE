import React, { memo, ReactNode, useEffect } from 'react';

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

  // display: none 대신 visibility + position 사용
  return (
    <div
      className='size-full'
      style={{
        visibility: isActive ? 'visible' : 'hidden',
        position: isActive ? 'static' : 'absolute',
        width: isActive ? 'auto' : '100%', // 활성화 상태일 때 너비를 자동으로 설정
        pointerEvents: isActive ? 'auto' : 'none', // 비활성 상태일 때 상호작용 불가능
        zIndex: isActive ? 1 : -1, // 비활성 상태일 때 더 낮은 z-index
      }}
    >
      {children}
    </div>
  );
});
