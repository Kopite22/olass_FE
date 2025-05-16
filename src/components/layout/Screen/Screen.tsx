import React, { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type ScreenProps = React.HTMLAttributes<HTMLDivElement>

const Screen = ({ children, className, ...props }: PropsWithChildren<ScreenProps>) => {
  return (
    <div
      className={cn('mx-auto h-[100dvh] max-w-[375px]', className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default Screen;
