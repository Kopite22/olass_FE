interface Props {
  car: 'benz' | 'porsche';
}

const SummaryUpper = ({ car }: Props) => {
  return (
    <div className='flex h-25 px-10 rounded-3xl w-full text-center mt-4 border-1 border-neutral-50 shadow-[0px_0px_12px_0px_#4DAF0229]'>
      {car === 'benz' ? (
        <p className='text-[20px] font-bold m-auto'>
          지금처럼 하면{' '}
          <span className='text-primary-500'>벤츠도 현실이 됩니다</span>
        </p>
      ) : (
        <div className='flex flex-col m-auto'>
          <span className='text-[20px] font-bold'>
            <span className='text-primary-500'>드림카, 포르쉐</span> 더 이상
          </span>
          <span className='text-[20px] font-bold'>남의 일이 아닙니다</span>
        </div>
      )}
    </div>
  );
};

export default SummaryUpper;
