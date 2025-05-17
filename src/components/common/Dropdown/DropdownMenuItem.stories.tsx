import type { Meta, StoryObj } from '@storybook/react';
import { Check, ChevronRight } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './Dropdown';

const meta = {
  title: 'Design System/UI/Dropdown/DropdownMenuItem',
  component: DropdownMenuItem,
  decorators: [
    (Story) => (
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white'>
          <Story />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  ],
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    label: '메뉴 아이템',
  },
  argTypes: {
    label: {
      control: 'text',
      description: '메뉴 아이템의 레이블',
    },
    description: {
      control: 'text',
      description: '메뉴 아이템의 부가 설명',
    },
    verticalPadding: {
      options: ['small', 'medium', 'large'],
      control: { type: 'radio' },
      description: '메뉴 아이템의 수직 패딩',
    },
    verticalAlign: {
      options: ['top', 'center', 'bottom'],
      control: { type: 'radio' },
      description: '메뉴 아이템 내부 요소의 수직 정렬',
    },
    disabled: {
      control: 'boolean',
      description: '메뉴 아이템 비활성화 여부',
    },
    active: {
      control: 'boolean',
      description: '메뉴 아이템 활성화 상태',
    },
  },
} as Meta<typeof DropdownMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    label: '메뉴 아이템',
    description: '메뉴 아이템에 대한 부가 설명입니다.',
  },
};

export const WithLeadingContent: Story = {
  args: {
    label: '메뉴 아이템',
    leadingContent: <Check className='h-4 w-4' />,
  },
};

export const WithTrailingContent: Story = {
  args: {
    label: '메뉴 아이템',
    trailingContent: <ChevronRight className='h-4 w-4' />,
  },
};

export const WithBothContent: Story = {
  args: {
    label: '메뉴 아이템',
    leadingContent: <Check className='h-4 w-4' />,
    trailingContent: <ChevronRight className='h-4 w-4' />,
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화된 메뉴 아이템',
    disabled: true,
  },
};

export const Active: Story = {
  args: {
    label: '활성화된 메뉴 아이템',
    active: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <>
      <DropdownMenuItem
        label='설명이 있는 메뉴 아이템'
        description='이 메뉴 아이템에 대한 부가 설명입니다.'
      />

      <DropdownMenuItem
        label='앞쪽 아이콘'
        leadingContent={<Check className='h-4 w-4' />}
      />
      <DropdownMenuItem
        label='뒤쪽 아이콘'
        trailingContent={<ChevronRight className='h-4 w-4' />}
      />
      <DropdownMenuItem
        label='양쪽 아이콘'
        leadingContent={<Check className='h-4 w-4' />}
        trailingContent={<ChevronRight className='h-4 w-4' />}
      />
      <DropdownMenuItem label='작은 패딩' verticalPadding='small' />
      <DropdownMenuItem label='중간 패딩' verticalPadding='medium' />
      <DropdownMenuItem label='큰 패딩' verticalPadding='large' />

      <DropdownMenuItem label='비활성화' disabled />
      <DropdownMenuItem label='활성화됨' active />
    </>
  ),
};
