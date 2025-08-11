'use client';

import { useEffect } from 'react';

import { Button } from '@/components/common/Button';
import FormBody from '@/components/common/Form/FormBody';
import { FormContainer } from '@/components/common/Form/FormContainer';
import FormFooter from '@/components/common/Form/FormFooter';
import FormHeader from '@/components/common/Form/FormHeader';
import FormTitle from '@/components/common/Form/FormTitle';
import { LabeledSlider } from '@/components/common/Slider';
import { useStep } from '@/components/steps';

import { useForm } from '@/_pages/asset-management-compare-form/providers/FormProvider';
import { isProd } from '@/constant/env';
import { analytics } from '@/features/analytics';

const getSliderHeading = (value: number) => {
  return `${value}%`;
};

export default function SavingsRateStep() {
  const { formData, setFormData } = useForm();
  const { next } = useStep();

  useEffect(() => {
    // 페이지 뷰 추적
    analytics.trackPageView(
      '/asset-management-compare-form?step=savingsRate',
      'asset_test_question_invest_ratio',
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
      console.log(
        '🚀 투자 비율 입력 페이지 분석 정보:',
        analytics.getDebugInfo()
      );
    }
  }, []);

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>
          월급 중 저축하거나 투자하는
          <br />
          비율을 알려주세요
        </FormTitle>
      </FormHeader>
      <FormBody>
        <LabeledSlider
          defaultValue={[formData.savingsRate]}
          onValueChange={(value) => {
            setFormData({ savingsRate: value[0] });
          }}
          heading={getSliderHeading(formData.savingsRate)}
          min={0}
          max={100}
          step={10}
          startLabel='0%'
          middleLabel='50%'
          endLabel='100%'
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
