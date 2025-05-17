import type { Meta, StoryObj } from '@storybook/react';

import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Design System/UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const Quarter: Story = {
  args: {
    value: 25,
  },
};

export const ThreeQuarters: Story = {
  args: {
    value: 75,
  },
};

// 모든 상태를 한 번에 보여주는 스토리
export const AllStates: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          0% 진행
        </h3>
        <Progress value={0} />
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          25% 진행
        </h3>
        <Progress value={25} />
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          50% 진행
        </h3>
        <Progress value={50} />
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          75% 진행
        </h3>
        <Progress value={75} />
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          100% 진행
        </h3>
        <Progress value={100} />
      </div>
    </div>
  ),
};

// 다양한 크기의 Progress 보여주기
export const CustomSizes: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          기본 높이 (0.5px)
        </h3>
        <Progress value={50} />
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          높이 1px
        </h3>
        <Progress value={50} className='h-[1px]' />
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          높이 2px
        </h3>
        <Progress value={50} className='h-0.5' />
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          높이 4px
        </h3>
        <Progress value={50} className='h-1' />
      </div>
    </div>
  ),
};
