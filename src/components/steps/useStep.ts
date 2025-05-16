import { useContext } from 'react';

import { StepContext, StepContextProps } from './context';

export function useStep<T extends string = string>(): StepContextProps<T> {
  const context = useContext(StepContext);

  if (!context) {
    throw new Error(
      'useStep 훅은 반드시 Steps 컴포넌트 내부에서 사용해야 합니다'
    );
  }

  // T가 string을 확장하므로 타입 캐스팅 안전
  return context as unknown as StepContextProps<T>;
}
