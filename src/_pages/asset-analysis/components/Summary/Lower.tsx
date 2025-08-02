import Image from 'next/image';

interface Props {
  car: 'avante' | 'bus';
}

const SummaryLower = ({ car }: Props) => {
  return (
    <div className='flex flex-col w-full h-25 pt-1 pb-5 px-10 rounded-3xl mx-auto mt-4 border-1 border-neutral-50 shadow-[0px_0px_12px_0px_#FF6D6D29]'>
      <div className='m-auto'>
        <div className='flex'>
          <Image src='/images/boom.png' alt='bus' width={51} height={51} />
          <p
            className={`text-[20px] font-bold mt-auto ${
              car === 'avante' ? 'text-alert' : ''
            }`}
          >
            {car === 'avante'
              ? '아반떼에서 멈출 건가요?'
              : '지금처럼 돈을 쓰면'}
          </p>
        </div>
        {car === 'bus' ? (
          <span className='text-[20px] font-bold'>
            5년 뒤에도 <span className='text-alert'>자차 없는 뚜벅이</span>
            예요
          </span>
        ) : (
          <span className='text-[20px] font-bold'>
            남들은 벌써 그다음으로 가고 있어요
          </span>
        )}
      </div>
    </div>
  );
};

export default SummaryLower;
