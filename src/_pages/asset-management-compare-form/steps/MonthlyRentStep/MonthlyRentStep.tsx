'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import getUUID from '@/lib/uuid';

import { Button } from '@/components/common/Button/Button';
import FormBody from '@/components/common/Form/FormBody';
import { FormContainer } from '@/components/common/Form/FormContainer';
import FormFooter from '@/components/common/Form/FormFooter';
import FormHeader from '@/components/common/Form/FormHeader';
import FormTitle from '@/components/common/Form/FormTitle';

import { OptionCard } from '@/_pages/asset-management-compare-form/components';
import { useForm } from '@/_pages/asset-management-compare-form/providers/FormProvider';

export default function MonthlyRentStep() {
  const router = useRouter();

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

  const handleNext = () => {
    router.push(`/asset-analysis?${searchParams.toString()}`);
  };

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
        <Button
          size='large'
          onClick={handleNext}
          isFullWidth
          disabled={selectedOption === null}
          dataGtmId='asset_test_question_monthly_rent'
        >
          결과 확인하기
        </Button>
      </FormFooter>
    </FormContainer>
  );
}
