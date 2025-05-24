import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { type ValidationError, LocaleNumberInput } from './index';

// no-op 함수 정의
const noop = () => {
  /* Storybook placeholder */
};

const meta = {
  title: 'Design system/UI/LocaleNumberInput',
  component: LocaleNumberInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Locale 지원 숫자 입력 컴포넌트입니다. 자동 포맷팅, validation, 다국어 지원 기능을 제공합니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '현재 숫자 값',
      control: 'number',
    },
    onChange: {
      description: '값 변경 콜백',
      action: 'changed',
    },
    onValidationError: {
      description: 'validation 에러 콜백',
      action: 'validation-error',
    },
    locale: {
      description: '로케일 설정',
      control: 'select',
      options: ['ko-KR', 'en-US', 'ja-JP'],
    },
    allowDecimals: {
      description: '소수점 허용 여부',
      control: 'boolean',
    },
    maxIntegerDigits: {
      description: '최대 정수 자릿수',
      control: 'number',
    },
    min: {
      description: '최소값',
      control: 'number',
    },
    max: {
      description: '최대값',
      control: 'number',
    },
    placeholder: {
      description: '플레이스홀더 텍스트',
      control: 'text',
    },
    error: {
      description: '에러 상태',
      control: 'boolean',
    },
    helperText: {
      description: '도움말 텍스트',
      control: 'text',
    },
  },
} satisfies Meta<typeof LocaleNumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 스토리
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleValidationError = (validationError: ValidationError | null) => {
      setError(validationError?.message || null);
    };

    return (
      <div className='w-80'>
        <LocaleNumberInput
          {...args}
          value={value}
          onChange={setValue}
          onValidationError={handleValidationError}
          error={error !== null}
          helperText={error}
        />
        <div className='mt-4 text-sm text-gray-600'>현재 값: {value}</div>
      </div>
    );
  },
  args: {
    placeholder: '숫자를 입력하세요',
    value: null,
    onChange: noop,
  },
};

// 급여 입력 (기본 사용 사례)
export const SalaryInput: Story = {
  render: (args) => {
    const [salary, setSalary] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleValidationError = (validationError: ValidationError | null) => {
      setError(validationError?.message || null);
    };

    return (
      <div className='w-80'>
        <LocaleNumberInput
          {...args}
          value={salary}
          onChange={setSalary}
          onValidationError={handleValidationError}
          error={error !== null}
          helperText={error}
        />
        <div className='mt-4 text-sm text-gray-600'>
          급여: {salary ? `${salary}만원` : '미입력'}
        </div>
      </div>
    );
  },
  args: {
    placeholder: '0',
    min: 100,
    max: 100000,
    maxIntegerDigits: 6,
    locale: 'ko-KR',
    minErrorMessage: '100만 원 이상만 입력할 수 있어요',
    maxErrorMessage: '10억 원 이하만 입력할 수 있어요',
    value: null,
    onChange: noop,
  },
};

// 소수점 허용
export const WithDecimals: Story = {
  render: (args) => {
    const [price, setPrice] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleValidationError = (validationError: ValidationError | null) => {
      setError(validationError?.message || null);
    };

    return (
      <div className='w-80'>
        <LocaleNumberInput
          {...args}
          value={price}
          onChange={setPrice}
          onValidationError={handleValidationError}
          error={error !== null}
          helperText={error}
        />
        <div className='mt-4 text-sm text-gray-600'>가격: ${price}</div>
      </div>
    );
  },
  args: {
    placeholder: '0.00',
    allowDecimals: true,
    min: 0,
    max: 999999.99,
    locale: 'en-US',
    minErrorMessage: 'Price must be at least $0',
    maxErrorMessage: 'Price cannot exceed $999,999.99',
    value: null,
    onChange: noop,
  },
};

// 다양한 Locale
export const DifferentLocales: Story = {
  render: () => {
    const [value, setValue] = useState<number | null>(1234567);

    return (
      <div className='space-y-6'>
        <div>
          <h3 className='mb-2 font-semibold'>한국어 (ko-KR)</h3>
          <LocaleNumberInput
            value={value}
            onChange={setValue}
            locale='ko-KR'
            placeholder='한국어 포맷'
          />
        </div>

        <div>
          <h3 className='mb-2 font-semibold'>English (en-US)</h3>
          <LocaleNumberInput
            value={value}
            onChange={setValue}
            locale='en-US'
            placeholder='English format'
          />
        </div>

        <div>
          <h3 className='mb-2 font-semibold'>日本語 (ja-JP)</h3>
          <LocaleNumberInput
            value={value}
            onChange={setValue}
            locale='ja-JP'
            placeholder='日本語フォーマット'
          />
        </div>

        <div className='mt-4 text-sm text-gray-600'>현재 값: {value}</div>
      </div>
    );
  },
  args: {
    value: null,
    onChange: noop,
  },
};

// Validation 에러 상태들
export const ValidationStates: Story = {
  render: () => {
    return (
      <div className='space-y-6'>
        <div>
          <h3 className='mb-2 font-semibold'>최소값 에러</h3>
          <LocaleNumberInput
            value={50}
            onChange={noop}
            min={100}
            max={1000}
            error={true}
            helperText='100 이상만 입력할 수 있어요'
            placeholder='100 이상 입력'
          />
        </div>

        <div>
          <h3 className='mb-2 font-semibold'>최대값 에러</h3>
          <LocaleNumberInput
            value={1500}
            onChange={noop}
            min={100}
            max={1000}
            error={true}
            helperText='1000 이하만 입력할 수 있어요'
            placeholder='1000 이하 입력'
          />
        </div>

        <div>
          <h3 className='mb-2 font-semibold'>정상 상태</h3>
          <LocaleNumberInput
            value={500}
            onChange={noop}
            min={100}
            max={1000}
            helperText='정상적으로 입력되었습니다'
            placeholder='100-1000 사이 입력'
          />
        </div>
      </div>
    );
  },
  args: {
    value: null,
    onChange: noop,
  },
};

// 자릿수 제한
export const DigitLimits: Story = {
  render: () => {
    const [value1, setValue1] = useState<number | null>(null);
    const [value2, setValue2] = useState<number | null>(null);

    return (
      <div className='space-y-6'>
        <div>
          <h3 className='mb-2 font-semibold'>3자리 제한</h3>
          <LocaleNumberInput
            value={value1}
            onChange={setValue1}
            maxIntegerDigits={3}
            placeholder='최대 3자리까지'
            helperText='최대 3자리 숫자까지 입력 가능'
          />
        </div>

        <div>
          <h3 className='mb-2 font-semibold'>6자리 제한</h3>
          <LocaleNumberInput
            value={value2}
            onChange={setValue2}
            maxIntegerDigits={6}
            placeholder='최대 6자리까지'
            helperText='최대 6자리 숫자까지 입력 가능'
          />
        </div>
      </div>
    );
  },
  args: {
    value: null,
    onChange: noop,
  },
};

// 실시간 validation 데모
export const RealtimeValidation: Story = {
  render: () => {
    const [amount, setAmount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [validationHistory, setValidationHistory] = useState<string[]>([]);

    const handleValidationError = (validationError: ValidationError | null) => {
      const message = validationError?.message || '유효함';
      setError(validationError?.message || null);

      setValidationHistory((prev) => [
        `${new Date().toLocaleTimeString()}: ${message}`,
        ...prev.slice(0, 4),
      ]);
    };

    return (
      <div className='w-96'>
        <LocaleNumberInput
          value={amount}
          onChange={setAmount}
          onValidationError={handleValidationError}
          min={1000}
          max={50000}
          error={error !== null}
          helperText={error}
          placeholder='1,000 ~ 50,000 사이 입력'
          minErrorMessage='최소 1,000 이상 입력해주세요'
          maxErrorMessage='최대 50,000까지 입력 가능합니다'
        />

        <div className='mt-4'>
          <h4 className='font-semibold text-sm'>현재 상태:</h4>
          <p className='text-sm'>값: {amount}</p>
          <p className='text-sm'>상태: {error ? '에러' : '정상'}</p>
        </div>

        <div className='mt-4'>
          <h4 className='font-semibold text-sm'>Validation 이력:</h4>
          <div className='text-xs text-gray-600 space-y-1 max-h-32 overflow-y-auto'>
            {validationHistory.map((entry, index) => (
              <div key={index}>{entry}</div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  args: {
    value: null,
    onChange: noop,
  },
};

// 비활성화 상태
export const Disabled: Story = {
  args: {
    value: 12345,
    onChange: noop,
    disabled: true,
    placeholder: '비활성화된 입력',
    helperText: '이 필드는 비활성화되었습니다',
  },
};

// 라벨과 함께
export const WithLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState<number | null>(null);

    return (
      <div className='w-80'>
        <LocaleNumberInput {...args} value={value} onChange={setValue} />
      </div>
    );
  },
  args: {
    label: '연봉',
    placeholder: '연봉을 입력하세요',
    helperText: '세전 연봉 기준으로 입력해주세요',
    min: 2000,
    max: 100000,
    value: null,
    onChange: noop,
  },
};

export const MaxValueEnforcement: Story = {
  name: 'Max 값 초과 입력 차단',
  args: {
    value: null,
    onChange: noop,
  },
  render: () => {
    const [value, setValue] = useState<number | null>(null);
    return (
      <div className='space-y-4'>
        <p className='text-sm text-gray-600'>
          max 값을 1000으로 설정했습니다. 1000을 초과하는 값은 입력할 수
          없습니다.
        </p>
        <LocaleNumberInput
          value={value}
          onChange={setValue}
          max={1000}
          maxErrorMessage='1000 이하만 입력 가능합니다'
          placeholder='최대 1000까지'
        />
        <div className='text-sm'>현재 값: {value ?? '없음'}</div>
      </div>
    );
  },
};

export const InvalidInputPrevention: Story = {
  name: '잘못된 입력 형태 차단',
  args: {
    value: null,
    onChange: noop,
  },
  render: () => {
    const [value, setValue] = useState<number | null>(null);
    return (
      <div className='space-y-4'>
        <p className='text-sm text-gray-600'>
          다음과 같은 잘못된 입력들이 차단됩니다:
          <br />• 여러 개의 소수점: "1.2.3"
          <br />• 콤마가 잘못된 위치: "1,.23"
          <br />• 마이너스가 중간에: "1-2"
          <br />• 소수점으로 시작: ".123"
        </p>
        <LocaleNumberInput
          value={value}
          onChange={setValue}
          allowDecimals={true}
          placeholder='잘못된 형태는 입력되지 않습니다'
        />
        <div className='text-sm'>현재 값: {value ?? '없음'}</div>
      </div>
    );
  },
};
