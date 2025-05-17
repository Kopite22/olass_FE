import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { AutoComplete } from './AutoComplete';

const meta = {
  title: 'Design System/UI/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AutoComplete>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 예제
export const Default: Story = {
  args: {
    options: [
      '개발자',
      '디자이너',
      'UX 디자이너',
      'UI 디자이너',
      '기획자',
      '마케터',
      '영업',
      '인사',
      '재무',
      '기타',
    ],
    placeholder: '직업을 입력하거나 선택하세요',
    onSelect: (_value) => {
      // 선택된 값 처리
    },
  },
};

// 라벨이 있는 예제
export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: '직업',
  },
};

// 에러 상태 예제
export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
    helperText: '직업을 선택해 주세요',
  },
};

// 도움말 텍스트가 있는 예제
export const WithHelperText: Story = {
  args: {
    ...Default.args,
    helperText: '현재 직업을 선택해 주세요',
  },
};

// 제어된 컴포넌트 예제
export const Controlled = () => {
  const [selectedJob, setSelectedJob] = useState('');

  return (
    <div className='flex flex-col gap-4 w-80'>
      <AutoComplete
        options={[
          '개발자',
          '디자이너',
          'UX 디자이너',
          'UI 디자이너',
          '기획자',
          '마케터',
          '영업',
          '인사',
          '재무',
          '기타',
        ]}
        label='직업'
        placeholder='직업을 입력하거나 선택하세요'
        onSelect={setSelectedJob}
      />

      <div className='p-4 bg-neutral-25 rounded-xl'>
        <p className='text-body-2'>선택된 직업: {selectedJob || '없음'}</p>
      </div>
    </div>
  );
};
