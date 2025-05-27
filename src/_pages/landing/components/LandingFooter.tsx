import Link from 'next/link';

import { cn } from '@/lib/className';

import { buttonVariants } from '@/components/common/Button/Button';
import ArrowRightThickIcon from '@/components/icons/ArrowRightThickIcon';

export default function LandingFooter() {
  return (
    <div className='flex flex-col items-center gap-3 w-full mb-[51px]'>
      <p className='text-label-1 font-medium text-neutral-500 text-center'>
        지금까지 <span className='text-primary-500'>1,273</span>명이 확인했어요
      </p>
      <div className='w-full px-5 sm:px-[20px]'>
        <Link
          prefetch
          className={cn(
            buttonVariants({
              variant: 'solid',
              color: 'primary',
              size: 'fullWidth',
              isFullWidth: true,
            })
          )}
          href='/salary-compare-form'
        >
          <div className='flex items-center justify-center gap-1.5'>
            1분 안에 내 연봉 위치 보기
            <ArrowRightThickIcon color='var(--color-neutral-0)' />
          </div>
        </Link>
      </div>
    </div>
  );
}
