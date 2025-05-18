import React, { PropsWithChildren } from 'react';

import { cn } from '@/lib/className';

type ScreenProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * SafeArea를 적용할지 여부
   * @default true
   */
  hasSafeArea?: boolean;
};

const Screen = ({
  children,
  className,
  hasSafeArea = true,
  ...props
}: PropsWithChildren<ScreenProps>) => {
  return (
    <div
      className={cn(
        'mx-auto h-screen w-screen max-w-lg overflow-hidden',
        hasSafeArea &&
          'pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Screen;
