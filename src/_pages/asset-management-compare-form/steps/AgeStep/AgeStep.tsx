'use client';

import { useState } from 'react';

import { FloatingActionButton } from '@/components/common/FloatingActionButton';
import FormBody from '@/components/common/Form/FormBody';
import { FormContainer } from '@/components/common/Form/FormContainer';
import FormDescription from '@/components/common/Form/FormDescription';
import FormHeader from '@/components/common/Form/FormHeader';
import FormTitle from '@/components/common/Form/FormTitle';
import { type ValidationError } from '@/components/common/LocaleNumberInput';
import { useStep } from '@/components/steps';

import { useForm } from '@/_pages/asset-management-compare-form/providers/FormProvider';
import AgeInput from '@/_pages/asset-management-compare-form/steps/AgeStep/AgeInput';

export default function AgeStep() {
  const { formData, setFormData } = useForm();
  const { next } = useStep();
  const [isValid, setIsValid] = useState(false);

  const handleAgeChange = (value: number) => {
    setFormData({ age: value });
  };

  const handleError = (_error: ValidationError | null, valid: boolean) => {
    setIsValid(valid);
  };

  const handleSubmit = async () => {
    if (!formData.age) {
      return;
    }
    next();
  };

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>나이를 알려주세요</FormTitle>
        <FormDescription>
          정확한 분석을 위해 나이를 입력해주세요
        </FormDescription>
      </FormHeader>
      <FormBody>
        <AgeInput
          age={formData.age}
          onAgeChange={handleAgeChange}
          onError={handleError}
        />
      </FormBody>
      <FloatingActionButton disabled={!isValid} onClick={handleSubmit}>
        다음 단계로
      </FloatingActionButton>
    </FormContainer>
  );
}
