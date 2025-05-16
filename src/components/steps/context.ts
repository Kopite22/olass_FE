import { createContext } from 'react';

export interface StepContextProps<T extends string = string> {
  currentStep: T;
  next: () => void;
  prev: () => void;
  goTo: (step: T) => void;
  steps: T[];
  currentIndex: number;
  registerStep: (stepName: T) => void;
}

// 기본 Context 값 - 실제 사용되지 않고 오직 타입 안전성을 위한 것
// eslint-disable-next-line @typescript-eslint/no-empty-function
const defaultContextValue: StepContextProps<string> = {
  currentStep: '' as string,
  next: () => {
    /* 초기값은 빈 함수 */
  },
  prev: () => {
    /* 초기값은 빈 함수 */
  },
  goTo: () => {
    /* 초기값은 빈 함수 */
  },
  steps: [],
  currentIndex: -1,
  registerStep: () => {
    /* 초기값은 빈 함수 */
  },
};

export const StepContext =
  createContext<StepContextProps<string>>(defaultContextValue);
