import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function FormTitle({ children }: Props) {
  return (
    <div>
      <h2 className='text-heading-1 font-bold text-neutral-700'>{children}</h2>
    </div>
  );
}
