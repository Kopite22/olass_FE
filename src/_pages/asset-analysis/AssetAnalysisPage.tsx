import Image from 'next/image';

import { GNB } from '@/components/common/GNB';
import ShareNetworkIcon from '@/components/icons/ShareNetworkIcon';
import { Screen } from '@/components/layout/Screen';

const AssetAnalysisPage = () => {
  return (
    <Screen className='flex flex-col gap-2 overflow-auto'>
      <div className='flex flex-1 flex-col bg-gradient-bus pb-9'>
        <GNB trailing={<ShareNetworkIcon />} />
        <div className='flex flex-col mx-auto text-center gap-5'>
          <div className='flex flex-col'>
            <span className='text-[15px]'>내 자산 관리 습관 등급은</span>
            <span className='text-[32px] font-bold'>대중교통</span>
          </div>
          <div className='rounded-full px-2.5 py-1 bg-alert w-fit'>
            <span className='text-[16px] font-semibold text-neutral-0'>
              또래 대비 하위 20%
            </span>
          </div>
        </div>

        {/* image */}

        <Image
          className='mx-auto'
          src='/images/bus.png'
          alt='bus'
          width={325}
          height={327}
        />

        {/* 등급 */}
        <div className='mx-5 px-5 py-3 border-1 border-alert rounded-full'></div>

        {/* 평가 요약 */}
        <div className='mx-5 flex flex-col py-5 px-10 rounded-3xl text-center mt-4 border-1 border-neutral-50'>
          <div className='mx-auto text-[20px] font-bold'>
            지금처럼 돈을 쓰면
          </div>
          <span className='text-[20px] font-bold'>
            5년 뒤에도 <span className='text-alert'>자차 없는 뚜벅이</span>
            예요
          </span>
        </div>

        {/* if keep */}
        <div className='mt-12 mx-5 flex flex-col gap-8 px-1'>
          <div className='flex flex-col gap-5'>
            <span className='text-[20px] font-bold'>
              지금의 소비.저축 패턴을
              <br />
              계속 유지한다면?
            </span>
            <div className='flex flex-col gap-6'>
              {[1, 2, 3].map((item) => (
                <div key={item} className='flex gap-4'>
                  <span className='w-[22px] h-[22px] text-center rounded-sm bg-neutral-50 text-neutral-500'>
                    {item}
                  </span>
                  <div className='flex flex-col'>
                    <span className='text-[18px] font-semibold'>
                      월급은 받자마자 다 써버리게 돼요
                    </span>
                    <span className='font-[15px] text-neutral-700'>
                      집 사고 차 바꾸는 친구들 사이에서 나만 제자리일 수 있어요.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 이미지 */}
          <div
            className='w-full h-[191px]'
            style={{ border: '1px solid red' }}
          ></div>
        </div>

        {/* now */}
        <div className='mt-12 flex flex-col gap-5 mx-5'>
          <span className='text-[20px] font-bold'>
            지금부터 바꿔볼 수 있어요
          </span>
          <div className='flex flex-col gap-6'>
            {[1, 2, 3].map((item) => (
              <div key={item} className='flex gap-4'>
                <span className='w-[22px] h-[22px] text-center rounded-sm bg-neutral-50 text-neutral-500'>
                  {item}
                </span>
                <div className='flex flex-col'>
                  <span className='text-[18px] font-semibold'>
                    월급의 30%는 먼저 떼어두세요
                  </span>
                  <span className='font-[15px] text-neutral-700'>
                    저축은 남은 돈으로 하는 것이 아니라 '먼저 떼어놓는
                    것'이에요. 월급이 30%는 자동이체로 분리해보세요.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
};

export default AssetAnalysisPage;
