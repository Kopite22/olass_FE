'use client';

import { Button } from '@/components/common/Button';
import { LabeledSlider } from '@/components/common/Slider';

import FormBody from '@/_pages/form/components/FormBody';
import { FormContainer } from '@/_pages/form/components/FormContainer';
import FormDescription from '@/_pages/form/components/FormDescription';
import FormFooter from '@/_pages/form/components/FormFooter';
import FormHeader from '@/_pages/form/components/FormHeader';
import FormTitle from '@/_pages/form/components/FormTitle';
import { useForm } from '@/_pages/form/providers/FormProvider';

export default function YearStep() {
  const { formData } = useForm();

  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>일한 지 얼마나 됐나요?</FormTitle>
        <FormDescription>연차를 알려주세요</FormDescription>
      </FormHeader>
      <FormBody>
        <LabeledSlider
          heading='신입'
          min={0}
          max={10}
          step={1}
          startLabel='신입'
          middleLabel='5년차'
          endLabel='10년차'
        />
      </FormBody>
      <FormFooter>
        <Button disabled={formData.job === null} isFullWidth>
          계속하기
        </Button>
      </FormFooter>
    </FormContainer>
  );
}
