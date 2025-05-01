import { type VariantProps, cva } from 'class-variance-authority';
import { ButtonHTMLAttributes, ReactNode, Ref } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        solid: '',
        outlined: 'border',
        text: '',
      },
      color: {
        primary: '',
        assistive: '',
      },
      size: {
        large: 'text-body-1 tracking-[0.57%]',
        medium: 'text-body-2 tracking-[0.96%]',
        small: 'text-label-1 tracking-[1.45%]',
      },
    },
    compoundVariants: [
      // Solid variants
      {
        variant: 'solid',
        color: 'primary',
        className:
          'bg-primary-500 text-neutral-900 hover:bg-primary-600 disabled:bg-neutral-25 disabled:text-neutral-300',
      },
      {
        variant: 'solid',
        color: 'assistive',
        className:
          'bg-neutral-25 text-neutral-800 hover:bg-neutral-50 disabled:bg-neutral-100 disabled:text-neutral-300',
      },
      // Outlined variants
      {
        variant: 'outlined',
        color: 'primary',
        className:
          'border-primary-500 text-neutral-900 hover:bg-primary-500/10 disabled:border-neutral-100 disabled:text-neutral-300',
      },
      {
        variant: 'outlined',
        color: 'assistive',
        className:
          'border-neutral-100 text-neutral-900 hover:bg-neutral-900/10 disabled:border-neutral-100 disabled:text-neutral-300',
      },
      // Text variants
      {
        variant: 'text',
        color: 'primary',
        className:
          'text-primary-800 hover:bg-primary-500/10 disabled:text-neutral-300',
      },
      {
        variant: 'text',
        color: 'assistive',
        className:
          'text-neutral-700 hover:bg-neutral-900/10 disabled:text-neutral-300',
      },
      // Size variants
      {
        variant: ['solid', 'outlined'],
        size: 'large',
        className: 'h-[52px] px-7 rounded-xl',
      },
      {
        variant: ['solid', 'outlined'],
        size: 'medium',
        className: 'h-[44px] px-5 rounded-lg',
      },
      {
        variant: 'text',
        size: ['medium', 'large'],
        className: 'h-[44px] px-4 rounded-lg',
      },
      {
        variant: 'text',
        size: 'small',
        className: 'h-[36px] px-3 rounded-md',
      },
    ],
    defaultVariants: {
      variant: 'solid',
      color: 'primary',
      size: 'medium',
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends ButtonVariantProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

const Button = ({
  className,
  variant,
  color,
  size,
  children,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => (
  <button
    className={cn(buttonVariants({ variant, color, size, className }))}
    {...props}
  >
    {leftIcon && <span className='mr-1.5'>{leftIcon}</span>}
    {children}
    {rightIcon && <span className='ml-1.5'>{rightIcon}</span>}
  </button>
);

Button.displayName = 'Button';

export { Button, buttonVariants };
