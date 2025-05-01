import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Design System/UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: 'Title',
    placeholder: '텍스트를 입력해 주세요.',
    helperText: '보조 메시지입니다.',
  },
};

export const Focus: Story = {
  args: {
    label: 'Title',
    placeholder: '텍스트를 입력해 주세요.',
    helperText: '보조 메시지입니다.',
  },
  parameters: {
    pseudo: {
      focus: true,
    },
  },
};

export const Filled: Story = {
  args: {
    label: 'Title',
    placeholder: '텍스트를 입력해 주세요.',
    helperText: '보조 메시지입니다.',
    defaultValue: '입력된 텍스트',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Title',
    placeholder: '텍스트를 입력해 주세요.',
    helperText: '보조 메시지입니다.',
    disabled: true,
  },
};

export const Error: Story = {
  args: {
    label: 'Title',
    placeholder: '텍스트를 입력해 주세요.',
    helperText: '에러 메시지',
    error: true,
  },
};

export const Success: Story = {
  args: {
    label: 'Title',
    placeholder: '텍스트를 입력해 주세요.',
    helperText: '성공 메시지',
  },
};

// 모든 상태를 한 번에 보여주는 스토리
export const AllStates: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Inactive
        </h3>
        <Input
          label='Title'
          placeholder='텍스트를 입력해 주세요.'
          helperText='보조 메시지입니다.'
        />
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>Focus</h3>
        <Input
          label='Title'
          placeholder='텍스트를 입력해 주세요.'
          helperText='보조 메시지입니다.'
          className='ring-1 ring-primary-600'
        />
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Filled
        </h3>
        <Input
          label='Title'
          placeholder='텍스트를 입력해 주세요.'
          helperText='보조 메시지입니다.'
          defaultValue='입력된 텍스트'
        />
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Disabled
        </h3>
        <Input
          label='Title'
          placeholder='텍스트를 입력해 주세요.'
          helperText='보조 메시지입니다.'
          disabled
        />
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>Error</h3>
        <Input
          label='Title'
          placeholder='텍스트를 입력해 주세요.'
          helperText='에러 메시지'
          error
        />
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Success
        </h3>
        <Input
          label='Title'
          placeholder='텍스트를 입력해 주세요.'
          helperText='성공 메시지'
        />
      </div>
    </div>
  ),
};
