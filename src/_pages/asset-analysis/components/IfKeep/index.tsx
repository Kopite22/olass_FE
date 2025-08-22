import Image from 'next/image';
import { useMemo } from 'react';

import ThirdTitle from '@/_pages/asset-analysis/components/IfKeep/ThirdTitle';
import { analysisByResults } from '@/_pages/asset-analysis/constants/analysisByResults';
import { ResponseCarList } from '@/apis/asset';

interface Props {
  car: ResponseCarList;
}

const imageBg = {
  publicTransportation: {
    src: '/images/person-bad.png',
    color: 'bg-[#FFE39D66]',
  },
  avante: { src: '/images/person-bad.png', color: 'bg-[#FFE39D66]' },
  grandeur: { src: '/images/person-normal.png', color: 'bg-[#EBFFD0]' },
  benz: { src: '/images/person-good.png', color: 'bg-primary-100' },
  porsche: { src: '/images/person-great.png', color: 'bg-primary-100' },
};

const IfKeep = ({ car }: Props) => {
  const ThirdTitles = useMemo(() => {
    return (
      <span className='text-[18px] font-semibold'>
        <ThirdTitle car={car} />
      </span>
    );
  }, [car]);

  return (
    <div className='mt-12 mx-5 flex flex-col gap-8 px-1'>
      <div className='flex flex-col gap-5'>
        <span className='text-[20px] font-bold'>
          지금의 소비, 저축 패턴을
          <br />
          계속 유지한다면?
        </span>
        <div className='flex flex-col gap-6'>
          {analysisByResults[car].ifKeep.map((item, idx) => (
            <div key={car} className='flex gap-4'>
              <div className='w-[22px] h-[22px] text-[13px] font-700 rounded-sm bg-neutral-50 text-neutral-500 shrink-0 flex items-center justify-center'>
                {idx + 1}
              </div>
              <div className='flex flex-col'>
                {idx === 2 ? (
                  ThirdTitles
                ) : (
                  <span className='text-[18px] font-semibold'>
                    {item.title}
                  </span>
                )}
                <span className='font-[15px] text-neutral-700'>
                  {item.content}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 이미지 */}
      <div
        className={`w-full h-[191px] ${imageBg[car].color} rounded-3xl flex items-center justify-center`}
      >
        <Image src={imageBg[car].src} alt='person' width={156} height={156} />
      </div>
    </div>
  );
};

export default IfKeep;
