import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import ChevronRight from 'public/svg/ChevronRight.svg';
import { useEffect, useState } from 'react';

import { Button } from '@/components/common/Button';

import { PostEmailAgreeParams } from '@/apis/user';
import postEmailAgree from '@/apis/user/postEmailAgree';

interface Props {
  email: string;
  uniqueId: string;
  onClose: () => void;
  onSubmitCallback: () => void;
}

const ModalAgree = ({ email, uniqueId, onClose, onSubmitCallback }: Props) => {
  const [isAgree, setIsAgree] = useState(false);
  const { mutate: postEmail } = useMutation({
    mutationFn: (params: PostEmailAgreeParams) => postEmailAgree(params),

    onSettled: () => {
      onSubmitCallback();
      onClose();
    },
  });

  const handleAgree = () => {
    setIsAgree(!isAgree);
  };

  const handleConfirm = () => {
    postEmail({ email, uniqueId, agree: isAgree });
  };

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className='absolute p-5 w-dvw max-w-lg bottom-0 h-screen bg-[#17171985] flex items-end justify-center'>
      <div className='bg-neutral-0 w-full pt-3 pb-5 px-5 z-10 rounded-3xl'>
        <div className='flex flex-col gap-1 py-5'>
          <span className='text-[17px] font-semibold'>
            자산 관리 콘텐츠를 이메일로 받아보시겠어요?
          </span>
          <span className='whitespace-pre-line text-neutral-500 text-[13px]'>
            {`입력하신 이메일은 콘텐츠 제공에만 사용되며,\n자세한 내용은 아래에서 확인하실 수 있어요.`}
          </span>
        </div>

        <div className='py-5 flex gap-2 items-center'>
          <input
            type='checkbox'
            className='w-[18px] h-[18px] rounded-md'
            checked={isAgree}
            onChange={handleAgree}
          />
          <div className='flex gap-1 w-full justify-between items-center'>
            <Link
              target='_blank'
              rel='noopener noreferrer'
              href='https://mountain-helicona-06a.notion.site/Olass-1f695cefe8be8077b34fc5187a3930a5?pvs=4'
            >
              <span>(필수) 개인정보 수집 및 이용 동의</span>
            </Link>
            <ChevronRight width={16} height={16} />
          </div>
        </div>

        <Button
          size='large'
          className='w-full mt-5 rounded-xl'
          disabled={!isAgree}
          onClick={handleConfirm}
          dataGtmId='agree_terms'
        >
          동의 하고 자산 관리 팁 받아보기
        </Button>
      </div>
    </div>
  );
};

export default ModalAgree;
