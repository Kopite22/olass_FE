import type { Meta } from '@storybook/react';
import { ChevronRight } from 'lucide-react';
import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './Dropdown';

const meta = {
  title: 'Design System/UI/Dropdown',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;

const DropdownMenuDemo = () => (
  <div className='flex min-h-[400px] items-start justify-center pt-16'>
    <DropdownMenu>
      <DropdownMenuTrigger>메뉴 열기</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          label='기본 메뉴'
          description='메뉴에 대한 설명이 들어갑니다'
        />
        <DropdownMenuItem
          label='Leading 아이콘'
          leadingContent={<ChevronRight className='h-4 w-4' />}
        />
        <DropdownMenuItem
          label='Trailing 아이콘'
          trailingContent={<ChevronRight className='h-4 w-4' />}
        />
        <DropdownMenuItem label='비활성화된 메뉴' disabled />
        <DropdownMenuItem label='활성화된 메뉴' active />
        <DropdownMenuItem
          label='상단 정렬'
          description='설명이 있는 경우 정렬이 더 잘 보입니다'
          verticalAlign='top'
        />
        <DropdownMenuItem
          label='하단 정렬'
          description='설명이 있는 경우 정렬이 더 잘 보입니다'
          verticalAlign='bottom'
        />
        <DropdownMenuItem label='작은 패딩' verticalPadding='small' />
        <DropdownMenuItem label='큰 패딩' verticalPadding='large' />
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

export const Default = {
  render: () => <DropdownMenuDemo />,
};
