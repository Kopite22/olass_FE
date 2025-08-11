'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import getUUID from '@/lib/uuid';

import { Button } from '@/components/common/Button';
import FormBody from '@/components/common/Form/FormBody';
import { FormContainer } from '@/components/common/Form/FormContainer';
import FormDescription from '@/components/common/Form/FormDescription';
import FormFooter from '@/components/common/Form/FormFooter';
import FormHeader from '@/components/common/Form/FormHeader';
import FormTitle from '@/components/common/Form/FormTitle';
import { type ValidationError } from '@/components/common/LocaleNumberInput';

import { useForm } from '@/_pages/salary-compare-form/providers/FormProvider';
import SalaryInput from '@/_pages/salary-compare-form/steps/SalaryStep/SalaryInput';
import { isProd } from '@/constant/env';
import { analytics } from '@/features/analytics';

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
    const uniqueId = getUUID();

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

  useEffect(() => {
    // 페이지 뷰 추적
    analytics.trackPageView(
      '/salary-compare-form?step=salary',
      'salary_comparison_salary',
      document.referrer || undefined
    );

    // 사용자 속성 설정
    analytics.setUserProperties({
      landing_visit_time: new Date().toISOString(),
      user_agent: navigator.userAgent.substring(0, 100), // UA 길이 제한
      screen_resolution: `${screen.width}x${screen.height}`,
    });

    // 개발 환경에서 디버그 정보 확인
    if (!isProd) {
      // eslint-disable-next-line no-console
      console.log('🚀 직업 입력 페이지 분석 정보:', analytics.getDebugInfo());
    }
  }, []);

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
      <FormFooter>
        <Button
          size='large'
          onClick={handleSubmit}
          disabled={!isValid}
          isFullWidth
        >
          내 연봉 위치 확인하기
        </Button>
      </FormFooter>
    </FormContainer>
  );
}
