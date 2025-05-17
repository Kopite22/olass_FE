import { cn } from '@/lib/className';

import { Slider } from './Slider';

interface LabeledSliderProps
  extends React.ComponentPropsWithoutRef<typeof Slider> {
  heading?: string;
  startLabel?: string;
  middleLabel?: string;
  endLabel?: string;
  showLabels?: boolean;
  className?: string;
}

const LabeledSlider = ({
  heading,
  startLabel,
  middleLabel,
  endLabel,
  showLabels = true,
  className,
  ...props
}: LabeledSliderProps) => {
  const labelClassName = '!text-label-2 text-neutral-500';
  return (
    <div className={cn('w-full flex flex-col gap-5', className)}>
      {heading && (
        <header className='text-title-3 font-bold text-primary-800'>
          {heading}
        </header>
      )}
      <div className='flex flex-col gap-2 w-full'>
        <Slider {...props} />
        {showLabels && (
          <footer className='flex justify-between text-xs text-muted-foreground mt-1'>
            {startLabel && <span className={labelClassName}>{startLabel}</span>}
            {middleLabel && (
              <span className={cn('mx-auto', labelClassName)}>
                {middleLabel}
              </span>
            )}
            {endLabel && <span className={labelClassName}>{endLabel}</span>}
          </footer>
        )}
      </div>
    </div>
  );
};

export { LabeledSlider };
