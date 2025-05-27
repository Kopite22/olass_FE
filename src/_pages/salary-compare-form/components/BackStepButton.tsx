import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon';
import { useStep } from '@/components/steps';

const BackStepButton = () => {
  const { prev, currentIndex } = useStep();

  return currentIndex === 0 ? null : (
    <button onClick={prev} className='flex flex-row items-center gap-0.5'>
      <ArrowLeftIcon />
      <span className='text-label-1 text-neutral-300'>이전</span>
    </button>
  );
};

export default BackStepButton;
