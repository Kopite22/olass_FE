'use client';

import { Button } from '@/components/common/Button';
import { useStep } from '@/components/steps';

import FormBody from '@/_pages/salaryCompareForm/components/FormBody';
import { FormContainer } from '@/_pages/salaryCompareForm/components/FormContainer';
import FormDescription from '@/_pages/salaryCompareForm/components/FormDescription';
import FormFooter from '@/_pages/salaryCompareForm/components/FormFooter';
import FormHeader from '@/_pages/salaryCompareForm/components/FormHeader';
import FormTitle from '@/_pages/salaryCompareForm/components/FormTitle';
import { useForm } from '@/_pages/salaryCompareForm/providers/FormProvider';
import JobInputDropdown from '@/_pages/salaryCompareForm/steps/JobStep/JobInputDropdown';

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
