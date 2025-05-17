'use client';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

import FormBody from '@/_pages/form/components/FormBody';
import { FormContainer } from '@/_pages/form/components/FormContainer';
import FormDescription from '@/_pages/form/components/FormDescription';
import FormFooter from '@/_pages/form/components/FormFooter';
import FormHeader from '@/_pages/form/components/FormHeader';
import FormTitle from '@/_pages/form/components/FormTitle';

export default function SalaryStep() {
  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>현재 연봉을 알려주세요</FormTitle>
        <FormDescription>세전 기준으로 입력해주세요</FormDescription>
      </FormHeader>
      <FormBody>
        <div className='flex h-72 flex-row w-full gap-2.5 items-start'>
          <Input helperText='asdfasdf' />
          <span className='shrink-0 pt-2.5'>만원</span>
        </div>
      </FormBody>
      <FormFooter>
        <Button isFullWidth>계속하기</Button>
      </FormFooter>
    </FormContainer>
  );
}
