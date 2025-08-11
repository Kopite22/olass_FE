'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/common/Button';
import FormBody from '@/components/common/Form/FormBody';
import { FormContainer } from '@/components/common/Form/FormContainer';
import FormDescription from '@/components/common/Form/FormDescription';
import FormFooter from '@/components/common/Form/FormFooter';
import FormHeader from '@/components/common/Form/FormHeader';
import FormTitle from '@/components/common/Form/FormTitle';
import { type ValidationError } from '@/components/common/LocaleNumberInput';
import { useStep } from '@/components/steps';

import { useForm } from '@/_pages/asset-management-compare-form/providers/FormProvider';
import AgeInput from '@/_pages/asset-management-compare-form/steps/AgeStep/AgeInput';

import { analytics } from '@/features/analytics';

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
    analytics.trackContentCTAClick({
      buttonType: 'next',
      eventUrl: window.location.pathname,
    });
    next();
  };

  useEffect(() => {
    // 페이지 뷰 추적
    analytics.trackPageView(
      '/asset-management-compare-form?step=age',
      'asset_test_question_age',
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
      console.log('🚀 나이 입력 페이지 분석 정보:', analytics.getDebugInfo());
    }
  }, []);

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
      <FormFooter>
        <Button
          size='large'
          isFullWidth
          disabled={!isValid}
          onClick={handleSubmit}
        >
          다음 단계로
        </Button>
      </FormFooter>
    </FormContainer>
  );
}
