'use client';

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

export default function JobStep() {
  const { formData, setFormData } = useForm();
  const { next } = useStep();

  const handleContinue = () => {
    next();
  };

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
