import { PropsWithChildren } from 'react';

export default function FormBody({ children }: PropsWithChildren) {
  return <div className='flex flex-col size-full'>{children}</div>;
}
