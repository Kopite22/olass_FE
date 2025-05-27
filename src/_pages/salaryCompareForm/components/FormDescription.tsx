import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function FormDescription({ children }: Props) {
  return (
    <p className='text-label-1 font-medium text-neutral-700'>{children}</p>
  );
}
