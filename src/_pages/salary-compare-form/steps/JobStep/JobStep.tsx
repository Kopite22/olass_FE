'use client';

import { Button } from '@/components/common/Button';
import { useStep } from '@/components/steps';

import FormBody from '@/_pages/salary-compare-form/components/FormBody';
import { FormContainer } from '@/_pages/salary-compare-form/components/FormContainer';
import FormDescription from '@/_pages/salary-compare-form/components/FormDescription';
import FormFooter from '@/_pages/salary-compare-form/components/FormFooter';
import FormHeader from '@/_pages/salary-compare-form/components/FormHeader';
import FormTitle from '@/_pages/salary-compare-form/components/FormTitle';
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
