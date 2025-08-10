'use client';

import { useEffect } from 'react';

import { Button } from '@/components/common/Button';
import FormBody from '@/components/common/Form/FormBody';
import { FormContainer } from '@/components/common/Form/FormContainer';
import FormDescription from '@/components/common/Form/FormDescription';
import FormFooter from '@/components/common/Form/FormFooter';
import FormHeader from '@/components/common/Form/FormHeader';
import FormTitle from '@/components/common/Form/FormTitle';
import { useStep } from '@/components/steps';

import { useForm } from '@/_pages/salary-compare-form/providers/FormProvider';
import JobInputDropdown from '@/_pages/salary-compare-form/steps/JobStep/JobInputDropdown';
import { isProd } from '@/constant/env';
import { analytics } from '@/features/analytics';

export default function JobStep() {
  const { formData, setFormData } = useForm();
  const { next } = useStep();

  const handleContinue = () => {
    next();
  };

  useEffect(() => {
    // 페이지 뷰 추적
    analytics.trackPageView(
      '/salary-compare-form?step=job',
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
        <FormTitle>어떤 일을 하시나요?</FormTitle>
        <FormDescription>직업을 적어주세요</FormDescription>
      </FormHeader>
      <FormBody>
        <JobInputDropdown
          selectedJob={formData.job}
          onSelect={(job) => setFormData({ job })}
        />
      </FormBody>
      <FormFooter>
        <Button
          size='large'
          onClick={handleContinue}
          disabled={formData.job === null}
          isFullWidth
        >
          {formData.job === null ? '정보를 입력해주세요' : '계속하기'}
        </Button>
      </FormFooter>
    </FormContainer>
  );
}
