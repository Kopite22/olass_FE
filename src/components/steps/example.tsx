// ========================================
import React from 'react';

import { Step, Steps, useStep } from './index';

// 예시 스텝 정의
enum MyStep {
  aForm = 'aForm',
  bForm = 'bForm',
  cForm = 'cForm',
}

// steps 배열 정의
const stepsList = [MyStep.aForm, MyStep.bForm, MyStep.cForm];

export function MultiStepFormExample() {
  return (
    <Steps<MyStep> initialStep={MyStep.aForm} steps={stepsList}>
      <Step name={MyStep.aForm}>
        <ComponentA />
      </Step>
      <Step name={MyStep.bForm}>
        <ComponentB />
      </Step>
      <Step name={MyStep.cForm}>
        <ComponentC />
      </Step>
    </Steps>
  );
}

// 예시 컴포넌트
const ComponentA = () => {
  const { next } = useStep<MyStep>();

  const handleClick = () => {
    next(); // 다음 스텝으로 이동
    // prev(); // 이전 스탭으로 이동
    // goTo(MyStep.cForm); // cForm으로 이동 <- 여기에서 타입 추론 됨
  };

  return <button onClick={handleClick}>다음으로</button>;
};

const ComponentB = () => {
  const { next, prev } = useStep<MyStep>();

  return (
    <div>
      <button onClick={prev}>이전으로</button>
      <button onClick={next}>다음으로</button>
    </div>
  );
};

const ComponentC = () => {
  const { prev, goTo } = useStep<MyStep>();

  return (
    <div>
      <button onClick={prev}>이전으로</button>
      <button onClick={() => goTo(MyStep.aForm)}>처음으로</button>
    </div>
  );
};
