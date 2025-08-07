import { z } from 'zod';

import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

interface Props {
  email: string;
  onShowModal: () => void;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailForm = ({ email, onChangeEmail, onShowModal }: Props) => {
  const emailSchema = z
    .string()
    .min(1, '이메일을 입력해주세요')
    .email('올바른 이메일 형식을 입력해주세요');

  const validateEmail = () => emailSchema.safeParse(email).success;

  return (
    <div className='w-full pt-9 shadow-[0_-1px_30px_30px_#fff] flex flex-col px-5'>
      <div className='text-center flex flex-col font-semibold text-[16px]'>
        <span>아직 중요한 내용이 더 있어요</span>
        <span>궁금하다면 이메일로 보내드릴게요!</span>
      </div>
      <Input
        className='mt-6'
        placeholder='example@email.com'
        value={email}
        onChange={onChangeEmail}
      />
      <Button
        size='large'
        isFullWidth
        className='mt-10 rounded-full'
        disabled={!validateEmail()}
        onClick={onShowModal}
      >
        이메일로 전체 내용 받기
      </Button>
    </div>
  );
};

export default EmailForm;
