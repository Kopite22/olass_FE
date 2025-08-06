import Link from 'next/link';
import { ReactNode } from 'react';

import { Logo } from '@/components/common/Logo';

interface Props {
  trailing?: ReactNode;
}

export default function GNB({ trailing }: Props) {
  return (
    <header className='flex items-center justify-center w-full'>
      <div className='flex flex-row justify-between items-center w-full py-3 px-5'>
        <div className='flex justify-center items-center'>
          <Link href='/'>
            <Logo />
          </Link>
        </div>
        {trailing && (
          <div className='flex justify-center items-center'>{trailing}</div>
        )}
      </div>
    </header>
  );
}
