import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { cn } from '@/lib/className';

import { Screen } from '@/components/layout/Screen';
import { Step, Steps, useStep } from '@/components/steps';
import { Button, buttonVariants } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/Dropdown';
import { Input } from '@/components/ui/Input';

// 예시 스텝 정의
enum FormStep {
  PersonalInfo = 'personalInfo',
  ContactInfo = 'contactInfo',
  Confirmation = 'confirmation',
}

// 개인 정보 입력 폼
const PersonalInfoForm = () => {
  const { next, prev, currentIndex } = useStep<FormStep>();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  return (
    <div className='p-4 space-y-4'>
      <h2 className='text-heading-1 text-neutral-900'>개인 정보</h2>
      <div className='space-y-3'>
        <Input
          label='이름'
          placeholder='이름을 입력하세요'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          label='나이'
          type='number'
          placeholder='나이를 입력하세요'
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <div>
          <p className='text-label-1 font-semibold text-neutral-700 mb-2'>
            성별
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(
                buttonVariants({
                  variant: 'outlined',
                  color: 'assistive',
                  isFullWidth: true,
                  className: 'justify-between',
                })
              )}
            >
              {gender || '선택하세요'}
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M5 7.5L10 12.5L15 7.5'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-[var(--radix-dropdown-menu-trigger-width)] bg-neutral-0'>
              <DropdownMenuItem
                label='남성'
                onClick={() => {
                  setGender('남성');
                }}
              />
              <DropdownMenuItem
                label='여성'
                onClick={() => {
                  setGender('여성');
                }}
              />
              <DropdownMenuItem
                label='기타'
                onClick={() => {
                  setGender('기타');
                }}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='pt-4 flex justify-between'>
        <Button
          variant='outlined'
          color='assistive'
          onClick={prev}
          disabled={currentIndex === 0}
        >
          이전
        </Button>
        <Button variant='solid' color='primary' onClick={next}>
          다음
        </Button>
      </div>
    </div>
  );
};

// 연락처 정보 입력 폼
const ContactInfoForm = () => {
  const { next, prev } = useStep<FormStep>();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToMarketing, setAgreeToMarketing] = useState(false);
  const [phoneError, setPhoneError] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    // 간단한 유효성 검사 (숫자만 포함하는지 확인)
    setPhoneError(!/^\d*$/.test(value));
  };

  return (
    <div className='p-4 space-y-4'>
      <h2 className='text-heading-1 text-neutral-900'>연락처 정보</h2>
      <div className='space-y-3'>
        <Input
          label='이메일'
          type='email'
          placeholder='이메일을 입력하세요'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          label='전화번호'
          type='tel'
          placeholder='전화번호를 입력하세요'
          value={phone}
          onChange={handlePhoneChange}
          error={phoneError}
          helperText={phoneError ? '숫자만 입력해주세요' : ''}
        />

        <div className='space-y-2 mt-2'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='terms'
              checked={agreeToTerms}
              onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
            />
            <label
              htmlFor='terms'
              className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-700'
            >
              이용약관에 동의합니다 (필수)
            </label>
          </div>

          <div className='flex items-center space-x-2'>
            <Checkbox
              id='marketing'
              checked={agreeToMarketing}
              onCheckedChange={(checked) =>
                setAgreeToMarketing(checked === true)
              }
            />
            <label
              htmlFor='marketing'
              className='text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-neutral-700'
            >
              마케팅 정보 수신에 동의합니다 (선택)
            </label>
          </div>
        </div>
      </div>
      <div className='pt-4 flex justify-between'>
        <Button variant='outlined' color='assistive' onClick={prev}>
          이전
        </Button>
        <Button
          variant='solid'
          color='primary'
          onClick={next}
          disabled={!agreeToTerms || phoneError}
        >
          다음
        </Button>
      </div>
    </div>
  );
};

// 확인 화면
const ConfirmationScreen = () => {
  const { prev, goTo } = useStep<FormStep>();

  return (
    <div className='p-4 space-y-4'>
      <h2 className='text-heading-1 text-neutral-900'>제출 완료</h2>
      <div className='p-4 bg-green-50 text-green-800 rounded-md'>
        모든 정보가 성공적으로 제출되었습니다.
      </div>
      <div className='pt-4 flex justify-between'>
        <Button variant='outlined' color='assistive' onClick={prev}>
          이전
        </Button>
        <Button
          variant='solid'
          color='primary'
          onClick={() => goTo(FormStep.PersonalInfo)}
        >
          처음으로
        </Button>
      </div>
    </div>
  );
};

// 내비게이션 헤더 컴포넌트
const NavigationHeader = () => {
  const { currentStep, goTo } = useStep<FormStep>();

  return (
    <div className='bg-primary-100 py-3 px-4 border-b border-primary-200'>
      <div className='flex justify-between items-center'>
        <h1 className='text-title-2 text-primary-900'>멀티스텝 폼 예제</h1>
        <div className='flex space-x-2'>
          <Button
            variant={currentStep === FormStep.PersonalInfo ? 'solid' : 'text'}
            color='primary'
            size='small'
            onClick={() => goTo(FormStep.PersonalInfo)}
          >
            1단계
          </Button>
          <Button
            variant={currentStep === FormStep.ContactInfo ? 'solid' : 'text'}
            color='primary'
            size='small'
            onClick={() => goTo(FormStep.ContactInfo)}
          >
            2단계
          </Button>
          <Button
            variant={currentStep === FormStep.Confirmation ? 'solid' : 'text'}
            color='primary'
            size='small'
            onClick={() => goTo(FormStep.Confirmation)}
          >
            3단계
          </Button>
        </div>
      </div>
    </div>
  );
};

// 모바일 화면에서의 Steps 예시 (내비게이션 헤더 포함)
const MultiStepFormMobile = () => {
  return (
    <Screen className='bg-white'>
      <Steps<FormStep> initialStep={FormStep.PersonalInfo}>
        <NavigationHeader />
        <Step name={FormStep.PersonalInfo}>
          <PersonalInfoForm />
        </Step>
        <Step name={FormStep.ContactInfo}>
          <ContactInfoForm />
        </Step>
        <Step name={FormStep.Confirmation}>
          <ConfirmationScreen />
        </Step>
      </Steps>
    </Screen>
  );
};

// 프로그레스 표시줄이 있는 상세 예제
const MultiStepFormWithProgress = () => {
  const steps = [
    { id: FormStep.PersonalInfo, label: '개인 정보' },
    { id: FormStep.ContactInfo, label: '연락처' },
    { id: FormStep.Confirmation, label: '확인' },
  ];

  return (
    <Screen className='bg-white'>
      <Steps<FormStep> initialStep={FormStep.PersonalInfo}>
        <NavigationHeader />
        {/* 스텝 진행 상태 표시 */}
        <StepProgressBar steps={steps} />

        <Step name={FormStep.PersonalInfo}>
          <PersonalInfoForm />
        </Step>
        <Step name={FormStep.ContactInfo}>
          <ContactInfoForm />
        </Step>
        <Step name={FormStep.Confirmation}>
          <ConfirmationScreen />
        </Step>
      </Steps>
    </Screen>
  );
};

// 스텝 진행 상태 표시 컴포넌트
const StepProgressBar = ({
  steps,
}: {
  steps: { id: FormStep; label: string }[];
}) => {
  const { currentStep, goTo } = useStep<FormStep>();
  const currentIndex = steps.findIndex((step) => step.id === currentStep);

  return (
    <div className='px-4 py-3 border-b border-neutral-200'>
      <div className='flex items-center justify-between'>
        {steps.map((step, index) => {
          const isActive = index === currentIndex;
          const isCompleted = index < currentIndex;

          return (
            <div
              key={step.id}
              className='flex flex-col items-center cursor-pointer'
              onClick={() => goTo(step.id)}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1
                  ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : isCompleted
                      ? 'bg-primary-200 text-primary-800'
                      : 'bg-neutral-200 text-neutral-500'
                  }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-xs 
                  ${
                    isActive
                      ? 'text-primary-900 font-medium'
                      : isCompleted
                      ? 'text-primary-700'
                      : 'text-neutral-500'
                  }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
      {/* 진행 바 */}
      <div className='mt-2 mx-8 h-1 bg-neutral-200 rounded-full'>
        <div
          className='h-full bg-primary-500 rounded-full transition-all duration-300'
          style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
};

// 자유롭게 단계를 이동할 수 있는 예제
const FreeNavigationExample = () => {
  return (
    <Screen className='bg-white'>
      <Steps<FormStep> initialStep={FormStep.PersonalInfo}>
        <div className='bg-primary-100 py-3 px-4 border-b border-primary-200'>
          <h1 className='text-title-2 text-primary-900 mb-3'>자유 이동 예제</h1>
          <StepNavButtons />
        </div>

        <Step name={FormStep.PersonalInfo}>
          <PersonalInfoForm />
        </Step>
        <Step name={FormStep.ContactInfo}>
          <ContactInfoForm />
        </Step>
        <Step name={FormStep.Confirmation}>
          <ConfirmationScreen />
        </Step>
      </Steps>
    </Screen>
  );
};

// 단계 이동 버튼 컴포넌트
const StepNavButtons = () => {
  const { goTo, currentStep, prev, next, currentIndex, steps } =
    useStep<FormStep>();

  return (
    <div className='flex flex-col space-y-2'>
      <div className='flex justify-between items-center'>
        <span className='text-sm font-medium text-primary-900'>
          현재 단계: {currentIndex + 1}/{steps.length}
        </span>
        <div className='flex space-x-2'>
          <Button
            variant='outlined'
            color='assistive'
            size='small'
            onClick={prev}
            disabled={currentIndex === 0}
          >
            이전
          </Button>
          <Button
            variant='solid'
            color='primary'
            size='small'
            onClick={next}
            disabled={currentIndex === steps.length - 1}
          >
            다음
          </Button>
        </div>
      </div>
      <div className='flex space-x-2'>
        {Object.values(FormStep).map((step, index) => (
          <Button
            key={step}
            variant={currentStep === step ? 'solid' : 'outlined'}
            color='primary'
            size='small'
            onClick={() => goTo(step)}
          >
            {index + 1}단계
          </Button>
        ))}
      </div>
    </div>
  );
};

const meta: Meta<typeof MultiStepFormMobile> = {
  title: 'Tech/MultiStep/Step Example',
  component: MultiStepFormMobile,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj<typeof MultiStepFormMobile> = {
  render: () => <MultiStepFormMobile />,
};

export const WithProgressBar: StoryObj<typeof MultiStepFormWithProgress> = {
  render: () => <MultiStepFormWithProgress />,
};

export const WithFreeNavigation: StoryObj<typeof FreeNavigationExample> = {
  render: () => <FreeNavigationExample />,
};
