import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function FormCard({ children }: Props) {
  return (
    <div className='pt-7 rounded-[24px] bg-neutral-0 size-full border-[0.5px] border-neutral-50 px-5 flex flex-col gap-8'>
      {children}
    </div>
  );
}
