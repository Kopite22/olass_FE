import React from 'react';

import { cn } from '@/lib/className';

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

const Grid: React.FC<GridProps> = ({ children, className = '' }) => {
  return (
    <div className={cn('h-full w-full px-5', className)}>
      <div className='grid grid-cols-4 gap-6 h-full w-full'>{children}</div>
    </div>
  );
};

export default Grid;
