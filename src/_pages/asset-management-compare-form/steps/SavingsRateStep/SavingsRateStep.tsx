'use client';

import { Button } from '@/components/common/Button';
import FormBody from '@/components/common/Form/FormBody';
import { FormContainer } from '@/components/common/Form/FormContainer';
import FormFooter from '@/components/common/Form/FormFooter';
import FormHeader from '@/components/common/Form/FormHeader';
import FormTitle from '@/components/common/Form/FormTitle';
import { LabeledSlider } from '@/components/common/Slider';
import { useStep } from '@/components/steps';

import { useForm } from '@/_pages/asset-management-compare-form/providers/FormProvider';

const getSliderHeading = (value: number) => {
  return `${value}%`;
};

export default function SavingsRateStep() {
  const { formData, setFormData } = useForm();
  const { next } = useStep();

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
