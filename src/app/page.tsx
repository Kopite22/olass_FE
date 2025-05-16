'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { cn } from '@/lib/utils';

import ArrowRightThickIcon from '@/components/icons/ArrowRightThickIcon';
import Screen from '@/components/layout/Screen/Screen';
import { buttonVariants } from '@/components/ui/Button/Button';
import Logo from '@/components/ui/Logo/Logo';

export default function HomePage() {
  return (
    <Screen className='flex flex-col justify-center gap-8 bg-neutral-0'>
      {/* GNB (Global Navigation Bar) */}
      <header className='flex items-center justify-center w-full'>
        <div className='flex justify-between items-center w-full py-3 px-5'>
          <div className='flex justify-center items-center'>
            <Logo />
          </div>
        </div>
      </header>

      {/* 메인 섹션 */}
      <main className='flex-1 flex flex-col items-center justify-center gap-[77px]'>
        {/* 콘텐츠 컨테이너 */}
        <div className='flex flex-col items-center w-full px-5 sm:px-[75px] gap-1.5'>
          {/* 텍스트 컨테이너 */}
          <div className='flex flex-col items-center gap-3 w-full'>
            <h1 className='text-title-2 font-bold text-neutral-800 text-center'>
              나랑 비슷한 사람들은
              <br />
              얼마나 벌까?
            </h1>
            <p className='text-body-2 font-medium text-neutral-500 text-center'>
              직무, 연차, 연봉만 입력하면
              <br />
              금방 알 수 있어요
            </p>
          </div>

          {/* 이미지 컨테이너 */}
          <div className='flex items-center justify-center p-[10px]'>
            <div className='relative w-[177px] h-[177px]'>
              <Image
                src='/images/Illustration.png'
                alt='랜딩 페이지 일러스트레이션'
                fill
                style={{ objectFit: 'fill' }}
                priority
              />
            </div>
          </div>
        </div>

        {/* 푸터 컨테이너 */}
        <div className='flex flex-col items-center gap-3 w-full mb-[51px]'>
          <p className='text-label-1 font-medium text-neutral-500 text-center'>
            지금까지 <span className='text-primary-500'>1,273</span>명이
            확인했어요
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
              href='/form'
            >
              <div className='flex items-center justify-center gap-1.5'>
                1분 안에 내 연봉 위치 보기
                <ArrowRightThickIcon color='var(--color-neutral-0)' />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </Screen>
  );
}
