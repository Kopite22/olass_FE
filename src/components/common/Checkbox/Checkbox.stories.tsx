import type { Meta, StoryObj } from '@storybook/react';

import { Checkbox } from './Checkbox';

const meta = {
  title: 'Design System/UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    checked: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    onCheckedChange: { action: 'checked changed' },
  },
} as Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

// 모든 상태를 한 번에 보여주는 스토리
export const AllStates: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Unchecked
        </h3>
        <div className='flex items-center gap-4'>
          <Checkbox id='unchecked' />
          <label
            htmlFor='unchecked'
            className='text-body-2 font-medium text-neutral-900'
          >
            체크박스
          </label>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Checked
        </h3>
        <div className='flex items-center gap-4'>
          <Checkbox id='checked' checked />
          <label
            htmlFor='checked'
            className='text-body-2 font-medium text-neutral-900'
          >
            체크박스
          </label>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Disabled
        </h3>
        <div className='flex flex-col gap-2'>
          <div className='flex items-center gap-4'>
            <Checkbox id='disabled' disabled />
            <label
              htmlFor='disabled'
              className='text-body-2 font-medium text-neutral-900'
            >
              체크박스
            </label>
          </div>
          <div className='flex items-center gap-4'>
            <Checkbox id='disabled-checked' disabled checked />
            <label
              htmlFor='disabled-checked'
              className='text-body-2 font-medium text-neutral-900'
            >
              체크박스
            </label>
          </div>
        </div>
      </div>
    </div>
  ),
};
