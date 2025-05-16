import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export function FormContainer({ children }: Props) {
  return <div className='size-full flex flex-col gap-11'>{children}</div>;
}
