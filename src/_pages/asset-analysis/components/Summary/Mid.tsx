import { carColor } from '@/_pages/asset-analysis/constants/carColor';

const SummaryMid = () => {
  return (
    <div className='flex flex-col w-full min-h-25 justify-center items-center px-10 rounded-3xl text-center mt-4 border-1 border-neutral-50 shadow-[0px_0px_12px_0px_#4DAF0229] bg-neutral-0'>
      <span className='text-[20px] font-bold'>
        지금은{' '}
        <span className={`text-${carColor.grandeur}`}>
          그랜저도 꿈이 아니에요
        </span>
      </span>
      <span className='text-[20px] font-bold'>
        다만 지금부터 계획이 달라져야 해요
      </span>
    </div>
  );
};

export default SummaryMid;
