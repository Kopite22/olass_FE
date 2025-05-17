import { useMemo } from 'react';

import { Progress } from '@/components/common/Progress';
import { useStep } from '@/components/steps';

import { FormSteps } from '@/_pages/form/constants/formSteps';

export default function FormProgress() {
  const { steps, currentIndex } = useStep<FormSteps>();

  const totalSteps = useMemo(() => steps.length, [steps]);

  const progressValue = useMemo(() => {
    return ((currentIndex + 1) / totalSteps) * 100;
  }, [currentIndex, totalSteps]);

  return <Progress value={progressValue} />;
}
