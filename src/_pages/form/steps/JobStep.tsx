import { Button } from '@/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/Dropdown';
import { Input } from '@/components/ui/Input';

import FormBody from '@/_pages/form/components/FormBody';
import { FormContainer } from '@/_pages/form/components/FormContainer';
import FormDescription from '@/_pages/form/components/FormDescription';
import FormFooter from '@/_pages/form/components/FormFooter';
import FormHeader from '@/_pages/form/components/FormHeader';
import FormTitle from '@/_pages/form/components/FormTitle';

export default function JobStep() {
  return (
    <FormContainer>
      <FormHeader>
        <FormTitle>어떤 일을 하시나요?</FormTitle>
        <FormDescription>직업을 적어주세요</FormDescription>
      </FormHeader>
      <FormBody>
        <DropdownMenu open>
          <Input />
          <DropdownMenuContent>
            <DropdownMenuItem label='개발자'>개발자</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </FormBody>
      <FormFooter>
        <Button isFullWidth>계속하기</Button>
      </FormFooter>
    </FormContainer>
  );
}
