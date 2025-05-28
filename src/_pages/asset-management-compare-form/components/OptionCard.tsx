import Image from 'next/image';

interface OptionCardProps {
  title: string;
  imageSrc: string;
  isSelected: boolean;
  onClick: () => void;
}

export const OptionCard = ({
  title,
  imageSrc,
  isSelected,
  onClick,
}: OptionCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full aspect-square rounded-[20px] py-3 overflow-hidden transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
        isSelected
          ? 'bg-primary-100 border-2 border-primary-500'
          : 'bg-white border border-neutral-100 hover:border-neutral-200'
      }`}
    >
      <div className='w-full h-full relative'>
        <Image
          priority
          src={imageSrc}
          alt={title}
          fill
          className='object-contain'
        />
      </div>
      <span className='text-body-1 font-bold leading-[26px] tracking-[-0.02%] text-neutral-900'>
        {title}
      </span>
    </button>
  );
};
