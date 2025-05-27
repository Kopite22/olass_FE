import { GNB } from '@/components/common/GNB';
import ShareIcon from '@/components/icons/ShareIcon';
import { Screen } from '@/components/layout/Screen';

export default function SalaryResultLoading() {
  return (
    <Screen className='flex flex-col gap-4'>
      <GNB
        trailing={
          <button className='p-2'>
            <ShareIcon />
          </button>
        }
      />

      <main className='flex-1 px-5 pb-6 overflow-hidden'>
        <div className='flex flex-col gap-8 h-full'>
          {/* 헤더 스켈레톤 */}
          <div className='flex items-end gap-12'>
            <div className='flex flex-col gap-1 w-[220px]'>
              <div className='h-4 bg-neutral-100 rounded animate-pulse' />
              <div className='flex flex-col gap-2'>
                <div className='h-6 bg-neutral-100 rounded animate-pulse' />
                <div className='h-6 bg-neutral-100 rounded animate-pulse w-3/4' />
              </div>
            </div>
            <div className='w-[68px] h-[68px] bg-neutral-100 rounded-full animate-pulse' />
          </div>

          {/* 차트 스켈레톤 */}
          <div className='bg-neutral-25 border border-neutral-50 rounded-[24px] px-5 py-6'>
            <div className='flex flex-col gap-6'>
              {/* 차트 바 스켈레톤 */}
              <div className='flex items-end justify-center gap-14'>
                <div className='flex flex-col items-center gap-2'>
                  <div className='w-[58px] h-[80px] bg-neutral-100 rounded-[8px] animate-pulse' />
                  <div className='flex flex-col items-center gap-1'>
                    <div className='h-5 w-16 bg-neutral-100 rounded animate-pulse' />
                    <div className='h-3 w-6 bg-neutral-100 rounded animate-pulse' />
                  </div>
                </div>
                <div className='flex flex-col items-center gap-2'>
                  <div className='w-[58px] h-[80px] bg-neutral-100 rounded-[8px] animate-pulse' />
                  <div className='flex flex-col items-center gap-1'>
                    <div className='h-5 w-16 bg-neutral-100 rounded animate-pulse' />
                    <div className='h-3 w-16 bg-neutral-100 rounded animate-pulse' />
                  </div>
                </div>
              </div>

              {/* 메시지 카드 스켈레톤 */}
              <div className='bg-neutral-0 rounded-[16px] p-5'>
                <div className='space-y-2'>
                  <div className='h-4 bg-neutral-100 rounded animate-pulse' />
                  <div className='h-4 bg-neutral-100 rounded animate-pulse w-4/5' />
                </div>
              </div>
            </div>
          </div>

          {/* CTA 섹션 스켈레톤 */}
          <div className='flex flex-col items-center gap-2 pb-6'>
            <div className='h-4 w-48 bg-neutral-100 rounded animate-pulse' />

            <div className='w-full px-5'>
              <div className='w-full h-12 bg-neutral-100 rounded-full animate-pulse' />
            </div>
          </div>
        </div>
      </main>
    </Screen>
  );
}
