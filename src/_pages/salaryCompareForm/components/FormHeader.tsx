import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function FormHeader({ children }: Props) {
  return <div className='flex flex-col gap-1'>{children}</div>;
}
