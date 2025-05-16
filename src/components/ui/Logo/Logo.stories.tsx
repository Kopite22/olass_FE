import type { Meta, StoryObj } from '@storybook/react';

import Logo from './Logo';

const meta = {
  title: 'Design System/UI/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} as Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithBackground: Story = {
  render: () => (
    <div className='p-4 bg-neutral-100'>
      <Logo />
    </div>
  ),
};

export const WithDarkBackground: Story = {
  render: () => (
    <div className='p-4 bg-neutral-900'>
      <Logo />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-2'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Default Size
        </h3>
        <Logo />
      </div>

      <div className='flex flex-col gap-2'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Small Size (50%)
        </h3>
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'left top' }}>
          <Logo />
        </div>
      </div>

      <div className='flex flex-col gap-2'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Large Size (150%)
        </h3>
        <div style={{ transform: 'scale(1.5)', transformOrigin: 'left top' }}>
          <Logo />
        </div>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          In Header
        </h3>
        <header className='flex items-center justify-between w-full p-4 bg-white shadow-sm'>
          <Logo />
          <nav className='flex gap-4'>
            <div className='text-body-2 font-medium text-neutral-900'>Home</div>
            <div className='text-body-2 font-medium text-neutral-900'>
              About
            </div>
            <div className='text-body-2 font-medium text-neutral-900'>
              Contact
            </div>
          </nav>
        </header>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          In Footer
        </h3>
        <footer className='flex flex-col items-center w-full p-4 bg-neutral-100'>
          <Logo />
          <div className='mt-2 text-body-3 text-neutral-500'>
            © 2023 Company Name. All rights reserved.
          </div>
        </footer>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          As Brand Element
        </h3>
        <div className='flex items-center gap-2'>
          <Logo />
          <span className='text-heading-2 font-bold text-neutral-900'>
            Company Name
          </span>
        </div>
      </div>
    </div>
  ),
};
