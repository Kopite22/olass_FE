'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/common/Button';
import FormBody from '@/components/common/Form/FormBody';
import { FormContainer } from '@/components/common/Form/FormContainer';
import FormDescription from '@/components/common/Form/FormDescription';
import FormFooter from '@/components/common/Form/FormFooter';
import FormHeader from '@/components/common/Form/FormHeader';
import FormTitle from '@/components/common/Form/FormTitle';
import { useStep } from '@/components/steps';

import { OptionCard } from '@/_pages/asset-management-compare-form/components';
import { useForm } from '@/_pages/asset-management-compare-form/providers/FormProvider';
import { isProd } from '@/constant/env';
import { analytics } from '@/features/analytics';

export default function CarOwnershipStep() {
  const { formData, setFormData } = useForm();
  const { next } = useStep();
  const [selectedOption, setSelectedOption] = useState<boolean | null>(
    formData.carOwnership
  );

  const handleOptionSelect = (hasCard: boolean) => {
    setSelectedOption(hasCard);
    setFormData({ carOwnership: hasCard });
  };

  const handleContinue = () => {
    if (selectedOption !== null) {
      next();
    }
  };

  useEffect(() => {
    // 페이지 뷰 추적
    analytics.trackPageView(
      '/asset-management-compare-form?step=carOwnership',
      'asset_test_question_own_car',
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
        '🚀 차량 보유 입력 페이지 분석 정보:',
        analytics.getDebugInfo()
      );
    }
  }, []);

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>차량을 보유 중이신가요?</FormTitle>
        <FormDescription>리스나 장기렌트 차량도 포함돼요</FormDescription>
      </FormHeader>
      <FormBody>
        <div className='flex flex-row gap-4 justify-center'>
          <OptionCard
            title='네'
            imageSrc='/images/car.png'
            isSelected={selectedOption === true}
            onClick={() => handleOptionSelect(true)}
          />
          <OptionCard
            title='아니오'
            imageSrc='/images/person.png'
            isSelected={selectedOption === false}
            onClick={() => handleOptionSelect(false)}
          />
        </div>
      </FormBody>
      <FormFooter>
        <Button
          size='large'
          onClick={handleContinue}
          disabled={selectedOption === null}
          isFullWidth
        >
          계속하기
        </Button>
      </FormFooter>
    </FormContainer>
  );
}
