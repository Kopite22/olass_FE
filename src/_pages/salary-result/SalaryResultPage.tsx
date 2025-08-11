'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';

import { buttonVariants } from '@/components/common/Button';
import { GNB } from '@/components/common/GNB';
import ShareIcon from '@/components/icons/ShareIcon';
import { Screen } from '@/components/layout/Screen';

import SalaryComparisonResult from '@/_pages/salary-result/components/SalaryComparisonResult';
import { assetQueryKeys } from '@/apis/asset';
import { GetSalaryCompareResultBody } from '@/apis/asset/getSalaryCompareResult';
import { isProd } from '@/constant/env';
import { analytics } from '@/features/analytics';

type SalaryResultPageProps = GetSalaryCompareResultBody;

export default function SalaryResultPage(body: SalaryResultPageProps) {
  const { data } = useSuspenseQuery(
    assetQueryKeys.getSalaryCompareResult(body)
  );

  const { salary, higherAmount, lowerAmount, avgAmount } = data;
  const comparisonResult =
    salary > avgAmount ? 'above' : salary < avgAmount ? 'below' : 'equal';

  const handleShare = () => {
    // 공유 기능 구현
  };

  const salaryData = {
    userSalary: salary,
    averageSalary: avgAmount,
    percentage:
      comparisonResult === 'above'
        ? higherAmount
        : comparisonResult === 'below'
        ? lowerAmount
        : 0,
  };

  useEffect(() => {
    // 페이지 뷰 추적
    analytics.trackPageView(
      '/salary-result',
      'salary_comparison_result',
      document.referrer || undefined
    );

    // 사용자 속성 설정
    analytics.setUserProperties({
      landing_visit_time: new Date().toISOString(),
      user_agent: navigator.userAgent.substring(0, 100), // UA 길이 제한
      screen_resolution: `${screen.width}x${screen.height}`,
    });

    // 개발 환경에서 디버그 정보 확인
    if (!isProd) {
      // eslint-disable-next-line no-console
      console.log('🚀 직업 입력 페이지 분석 정보:', analytics.getDebugInfo());
    }
  }, []);

  return (
    <Screen className='flex flex-col gap-4 bg-neutral-0'>
      <GNB
        trailing={
          <button onClick={handleShare} className='p-2'>
            <ShareIcon />
          </button>
        }
      />

      <main className='flex-1 px-5 pb-6 overflow-hidden'>
        <div className='flex flex-col gap-8 h-full'>
          {/* 연봉 비교 결과 */}
          <SalaryComparisonResult
            result={comparisonResult}
            salaryData={salaryData}
            className='flex-1'
          />

          {/* CTA 섹션 */}
          <div className='flex flex-col items-center gap-2'>
            <p className='text-label-2 font-medium text-neutral-600 text-center leading-[18px]'>
              몇 가지 질문만 더, 자산관리 등급을 알려드려요
            </p>

            <div className='w-full px-5'>
              <Link
                className={buttonVariants({ size: 'fullWidth' })}
                href='/asset-management-compare-form'
                prefetch
              >
                <div className='flex items-center justify-center gap-1.5'>
                  다음 질문으로 가기
                  <svg
                    width='21'
                    height='20'
                    viewBox='0 0 21 20'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7.65104 3.81742C7.22797 4.24049 7.22797 4.92642 7.65104 5.34949L12.3017 10.0001L7.65104 14.6508C7.22797 15.0738 7.22797 15.7598 7.65104 16.1828C8.07411 16.6059 8.76004 16.6059 9.18311 16.1828L14.5998 10.7662C15.0228 10.3431 15.0228 9.65716 14.5998 9.23409L9.18311 3.81742C8.76004 3.39436 8.07411 3.39436 7.65104 3.81742Z'
                      fill='white'
                    />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Screen>
  );
}
