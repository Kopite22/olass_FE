import type { Meta, StoryObj } from '@storybook/react';
import { ArrowRight, Plus } from 'lucide-react';
import { useState } from 'react';

import { FloatingActionButton } from './FloatingActionButton';

const meta = {
  title: 'Design System/UI/FloatingActionButton',
  component: FloatingActionButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: '확인하기',
  },
  argTypes: {
    variant: {
      options: ['solid', 'outlined', 'text'],
      control: { type: 'radio' },
    },
    color: {
      options: ['primary', 'assistive', 'dark'],
      control: { type: 'radio' },
    },
    size: {
      options: ['large', 'medium', 'small', 'fullWidth'],
      control: { type: 'radio' },
    },
    isFullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    leftIcon: {
      control: 'boolean',
    },
    rightIcon: {
      control: 'boolean',
    },
    bottomOffset: {
      control: { type: 'number', min: 0, max: 100, step: 1 },
      description: '하단에서 떨어진 거리 (px)',
    },
    zIndex: {
      control: { type: 'number', min: 1, max: 100, step: 1 },
      description: 'z-index 값',
    },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof FloatingActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// 스토리를 위한 컨테이너 컴포넌트
const StoryContainer = ({
  children,
  showContent = true,
  withInput = false,
}: {
  children: React.ReactNode;
  showContent?: boolean;
  withInput?: boolean;
}) => (
  <div className='relative h-screen bg-neutral-25'>
    {showContent && (
      <div className='p-5 pb-24'>
        <h1 className='text-title-2 font-bold mb-4'>
          FloatingActionButton 테스트
        </h1>
        <p className='text-body-1 text-neutral-600 mb-6'>
          이 버튼은 화면 하단에 고정되어 있으며, 키보드가 올라올 때 자동으로
          위치가 조정됩니다.
        </p>
        {withInput && (
          <div className='space-y-4'>
            <div>
              <label className='block text-label-1 font-medium mb-2'>
                이름
              </label>
              <input
                type='text'
                placeholder='이름을 입력하세요'
                className='w-full p-4 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500'
              />
            </div>
            <div>
              <label className='block text-label-1 font-medium mb-2'>
                이메일
              </label>
              <input
                type='email'
                placeholder='이메일을 입력하세요'
                className='w-full p-4 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500'
              />
            </div>
            <div>
              <label className='block text-label-1 font-medium mb-2'>
                전화번호
              </label>
              <input
                type='tel'
                placeholder='전화번호를 입력하세요'
                className='w-full p-4 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500'
              />
            </div>
            <div>
              <label className='block text-label-1 font-medium mb-2'>
                메모
              </label>
              <textarea
                placeholder='메모를 입력하세요'
                rows={4}
                className='w-full p-4 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none'
              />
            </div>
          </div>
        )}
        <div className='mt-8 space-y-4'>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className='p-4 bg-white rounded-lg border border-neutral-100'
            >
              <h3 className='text-headline-1 font-medium mb-2'>
                콘텐츠 항목 {i + 1}
              </h3>
              <p className='text-body-2 text-neutral-600'>
                스크롤 가능한 콘텐츠입니다. 버튼이 콘텐츠를 가리지 않고 항상
                접근 가능한 위치에 있어야 합니다.
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
    {children}
  </div>
);

export const Default: Story = {
  render: (args) => (
    <StoryContainer>
      <FloatingActionButton {...args}>
        {args.children || '확인하기'}
      </FloatingActionButton>
    </StoryContainer>
  ),
};

export const WithInput: Story = {
  render: (args) => (
    <StoryContainer withInput>
      <FloatingActionButton {...args}>제출하기</FloatingActionButton>
    </StoryContainer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '입력 필드와 함께 사용하는 예시입니다. 입력 필드를 탭하면 키보드가 올라오고, 버튼이 자동으로 키보드 위로 이동합니다.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className='space-y-4 p-5'>
      <h2 className='text-heading-1 font-semibold mb-4'>Variant 예시</h2>
      <div className='space-y-8'>
        <StoryContainer showContent={false}>
          <FloatingActionButton variant='solid' color='primary'>
            Primary Solid
          </FloatingActionButton>
        </StoryContainer>
        <StoryContainer showContent={false}>
          <FloatingActionButton variant='outlined' color='primary'>
            Primary Outlined
          </FloatingActionButton>
        </StoryContainer>
        <StoryContainer showContent={false}>
          <FloatingActionButton variant='solid' color='assistive'>
            Assistive
          </FloatingActionButton>
        </StoryContainer>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className='space-y-8'>
      <StoryContainer showContent={false}>
        <FloatingActionButton leftIcon={<Plus className='h-5 w-5' />}>
          추가하기
        </FloatingActionButton>
      </StoryContainer>
      <StoryContainer showContent={false}>
        <FloatingActionButton rightIcon={<ArrowRight className='h-5 w-5' />}>
          다음 단계
        </FloatingActionButton>
      </StoryContainer>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};

export const CustomBottomOffset: Story = {
  render: () => (
    <StoryContainer>
      <FloatingActionButton bottomOffset={48}>
        48px 떨어진 버튼
      </FloatingActionButton>
    </StoryContainer>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'bottomOffset prop을 사용하여 하단에서 떨어진 거리를 조정할 수 있습니다.',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <StoryContainer withInput>
      <FloatingActionButton disabled>비활성화된 버튼</FloatingActionButton>
    </StoryContainer>
  ),
};

// 키보드 테스트를 위한 인터랙티브 스토리
export const KeyboardTest: Story = {
  render: () => {
    const [inputValue, setInputValue] = useState('');
    const [isValid, setIsValid] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      setIsValid(value.length > 0);
    };

    return (
      <StoryContainer showContent={false}>
        <div className='p-5 pb-24'>
          <h1 className='text-title-2 font-bold mb-4'>키보드 테스트</h1>
          <p className='text-body-1 text-neutral-600 mb-6'>
            아래 입력 필드를 클릭하여 키보드를 올리고, 버튼의 위치 변화를
            확인해보세요.
          </p>

          <div className='space-y-4'>
            <div>
              <label className='block text-label-1 font-medium mb-2'>
                테스트 입력 필드
              </label>
              <input
                type='text'
                value={inputValue}
                onChange={handleInputChange}
                placeholder='여기에 입력해보세요'
                className='w-full p-4 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500'
              />
            </div>

            <div className='bg-primary-50 p-4 rounded-lg'>
              <h3 className='text-headline-2 font-medium mb-2'>
                💡 테스트 방법
              </h3>
              <ul className='text-body-2 text-neutral-700 space-y-1'>
                <li>• 모바일 기기에서 테스트하세요</li>
                <li>• 입력 필드를 탭하여 키보드를 올리세요</li>
                <li>• 버튼이 키보드 위로 올라가는지 확인하세요</li>
                <li>
                  • 키보드를 내리면 버튼이 원래 위치로 돌아가는지 확인하세요
                </li>
              </ul>
            </div>
          </div>
        </div>

        <FloatingActionButton disabled={!isValid}>
          {isValid ? '입력 완료!' : '입력해주세요'}
        </FloatingActionButton>
      </StoryContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          '실제 키보드 동작을 테스트할 수 있는 인터랙티브 스토리입니다. 모바일 기기나 개발자 도구의 모바일 모드에서 테스트하세요.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
