'use client';

import { useState } from 'react';

import { FloatingActionButton } from '@/components/common/FloatingActionButton';
import { type ValidationError } from '@/components/common/LocaleNumberInput';

import FormBody from '@/_pages/form/components/FormBody';
import { FormContainer } from '@/_pages/form/components/FormContainer';
import FormDescription from '@/_pages/form/components/FormDescription';
import FormHeader from '@/_pages/form/components/FormHeader';
import FormTitle from '@/_pages/form/components/FormTitle';
import { useForm } from '@/_pages/form/providers/FormProvider';
import SalaryInput from '@/_pages/form/steps/SalaryStep/SalaryInput';

export default function SalaryStep() {
  const { formData, setFormData } = useForm();
  const [isValid, setIsValid] = useState(false);

  const handleSalaryChange = (value: number) => {
    setFormData({ salary: value });
  };

  const handleError = (_error: ValidationError | null, valid: boolean) => {
    setIsValid(valid);
  };

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>현재 연봉을 알려주세요</FormTitle>
        <FormDescription>세전 기준으로 입력해주세요</FormDescription>
      </FormHeader>
      <FormBody>
        <SalaryInput
          salary={formData.salary}
          onSalaryChange={handleSalaryChange}
          onError={handleError}
        />
      </FormBody>
      <FloatingActionButton disabled={!isValid}>
        내 연봉 위치 확인하기
      </FloatingActionButton>
    </FormContainer>
  );
}
