'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { FloatingActionButton } from '@/components/common/FloatingActionButton';
import { type ValidationError } from '@/components/common/LocaleNumberInput';

import FormBody from '@/_pages/salary-compare-form/components/FormBody';
import { FormContainer } from '@/_pages/salary-compare-form/components/FormContainer';
import FormDescription from '@/_pages/salary-compare-form/components/FormDescription';
import FormHeader from '@/_pages/salary-compare-form/components/FormHeader';
import FormTitle from '@/_pages/salary-compare-form/components/FormTitle';
import { useForm } from '@/_pages/salary-compare-form/providers/FormProvider';
import SalaryInput from '@/_pages/salary-compare-form/steps/SalaryStep/SalaryInput';

export default function SalaryStep() {
  const { formData, setFormData } = useForm();
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  const handleSalaryChange = (value: number) => {
    setFormData({ salary: value });
  };

  const handleError = (_error: ValidationError | null, valid: boolean) => {
    setIsValid(valid);
  };

  const handleSubmit = async () => {
    if (!formData.job || !formData.salary) {
      return;
    }

    // UUID 생성
    const uniqueId = uuidv4();

    // URL 파라미터로 폼 데이터 전달
    const searchParams = new URLSearchParams({
      unique_id: uniqueId,
      job_id: formData.job.jobId,
      experience: formData.year.toString(),
      salary: formData.salary.toString(),
    });

    // 결과 페이지로 이동
    router.push(`/salary-result?${searchParams.toString()}`);
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
      <FloatingActionButton disabled={!isValid} onClick={handleSubmit}>
        내 연봉 위치 확인하기
      </FloatingActionButton>
    </FormContainer>
  );
}
