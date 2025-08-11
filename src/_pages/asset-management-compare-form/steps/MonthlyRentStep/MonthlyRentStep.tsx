'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/className';
import getUUID from '@/lib/uuid';

import { buttonVariants } from '@/components/common/Button/Button';
import FormBody from '@/components/common/Form/FormBody';
import { FormContainer } from '@/components/common/Form/FormContainer';
import FormFooter from '@/components/common/Form/FormFooter';
import FormHeader from '@/components/common/Form/FormHeader';
import FormTitle from '@/components/common/Form/FormTitle';

import { OptionCard } from '@/_pages/asset-management-compare-form/components';
import { useForm } from '@/_pages/asset-management-compare-form/providers/FormProvider';
import { isProd } from '@/constant/env';
import { analytics } from '@/features/analytics';

export default function MonthlyRentStep() {
  const { formData, setFormData } = useForm();
  const [selectedOption, setSelectedOption] = useState<boolean | null>(
    formData.monthlyRent
  );

  const handleOptionSelect = (hasMonthlyRent: boolean) => {
    setSelectedOption(hasMonthlyRent);
    setFormData({ monthlyRent: hasMonthlyRent });
  };

  const uniqueId = getUUID();

  const searchParams = new URLSearchParams({
    unique_id: uniqueId,
    age: formData.age?.toString() ?? '',
    hasCar: formData.carOwnership?.toString() ?? '',
    isMonthlyRent: formData.monthlyRent?.toString() ?? '',
    saveRate: formData.savingsRate?.toString() ?? '',
  });

  useEffect(() => {
    // 페이지 뷰 추적
    analytics.trackPageView(
      '/asset-management-compare-form?step=monthlyRent',
      'asset_test_question_monthly_rent',
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
      console.log('🚀 월세 입력 페이지 분석 정보:', analytics.getDebugInfo());
    }
  }, []);

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>현재 월세에서 지내고 있나요?</FormTitle>
      </FormHeader>
      <FormBody>
        <div className='flex flex-row gap-4 justify-center'>
          <OptionCard
            title='네'
            imageSrc='/images/circle.png'
            isSelected={selectedOption === true}
            onClick={() => handleOptionSelect(true)}
          />
          <OptionCard
            title='아니오'
            imageSrc='/images/x.png'
            isSelected={selectedOption === false}
            onClick={() => handleOptionSelect(false)}
          />
        </div>
      </FormBody>
      <FormFooter>
        <Link
          prefetch
          className={cn(
            buttonVariants({
              variant: 'solid',
              color: 'primary',
              size: 'fullWidth',
              isFullWidth: true,
            })
          )}
          href={`/asset-analysis?${searchParams.toString()}`}
        >
          <div className='flex items-center justify-center gap-1.5'>
            계속하기
          </div>
        </Link>
      </FormFooter>
    </FormContainer>
  );
}
