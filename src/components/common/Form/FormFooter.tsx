import { PropsWithChildren } from 'react';

export default function FormFooter({ children }: PropsWithChildren) {
  return <footer className='py-5'>{children}</footer>;
}
