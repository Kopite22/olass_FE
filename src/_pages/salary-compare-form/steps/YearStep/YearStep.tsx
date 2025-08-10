'use client';

import { useEffect } from 'react';

import { Button } from '@/components/common/Button';
import FormBody from '@/components/common/Form/FormBody';
import { FormContainer } from '@/components/common/Form/FormContainer';
import FormDescription from '@/components/common/Form/FormDescription';
import FormFooter from '@/components/common/Form/FormFooter';
import FormHeader from '@/components/common/Form/FormHeader';
import FormTitle from '@/components/common/Form/FormTitle';
import { LabeledSlider } from '@/components/common/Slider';
import { useStep } from '@/components/steps';

import { useForm } from '@/_pages/salary-compare-form/providers/FormProvider';
import { isProd } from '@/constant/env';
import { analytics } from '@/features/analytics';

const getSliderHeading = (value: number) => {
  if (value === 0) return '신입';
  return `${value}년차`;
};

export default function YearStep() {
  const { formData, setFormData } = useForm();
  const { next } = useStep();

  useEffect(() => {
    // 페이지 뷰 추적
    analytics.trackPageView(
      '/salary-compare-form?step=year',
      'salary_comparison_experience',
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
        <FormTitle>일한 지 얼마나 됐나요?</FormTitle>
        <FormDescription>연차를 알려주세요</FormDescription>
      </FormHeader>
      <FormBody>
        <LabeledSlider
          defaultValue={[formData.year]}
          onValueChange={(value) => {
            setFormData({ year: value[0] });
          }}
          heading={getSliderHeading(formData.year)}
          min={0}
          max={10}
          step={1}
          startLabel='신입'
          middleLabel='5년차'
          endLabel='10년차'
        />
      </FormBody>
      <FormFooter>
        <Button size='large' onClick={next} isFullWidth>
          계속하기
        </Button>
      </FormFooter>
    </FormContainer>
  );
}
