'use client';

import Image from 'next/image';

import { cn } from '@/lib/className';

type ComparisonResult = 'below' | 'equal' | 'above';

interface SalaryData {
  userSalary: number;
  averageSalary: number;
  percentage: number;
}

interface SalaryComparisonResultProps {
  result: ComparisonResult;
  salaryData: SalaryData;
  className?: string;
}

const SalaryComparisonResult: React.FC<SalaryComparisonResultProps> = ({
  result,
  salaryData,
  className,
}) => {
  const getResultConfig = () => {
    switch (result) {
      case 'below':
        return {
          title: '이럴수가..',
          description: '당신은 같은 연차 평균보다',
          percentage: `${salaryData.percentage}%`,
          percentageText: ' 덜 벌고 있어요',
          image: '/images/astonished-face.png',
          userBarColor: '#F84A4A',
          userLabelBg: '#FFEAEA',
          userLabelText: '#F84A4A',
          priceTextColor: '#F84A4A',
          userBarLabel: '평균 이하',
          cardMessage: '연봉보다 중요한 건, 돈 쓰는 습관입니다',
          cardDescription: '자산의 격차는 습관에서 시작돼요',
        };
      case 'equal':
        return {
          title: '다행이네요',
          description: '당신의 연봉은 같은 연차',
          percentage: '평균',
          percentageText: '과 같아요',
          image: '/images/slightly-smiling-face.png',
          userBarColor: '#0084EC',
          userLabelBg: '#E0F4FF',
          userLabelText: '#0075D1',
          priceTextColor: '#141415',
          userBarLabel: '평균',
          cardMessage: '평균이라고 안심하긴 이르죠!',
          cardDescription: '내 자산관리 습관도 과연 평균일까요?',
        };
      case 'above':
        return {
          title: '축하드려요',
          description: '당신은 같은 연차 평균보다',
          percentage: `${salaryData.percentage}%`,
          percentageText: ' 더 벌고 있어요',
          image: '/images/beaming-face.png',
          userBarColor: '#0084EC',
          userLabelBg: '#E0F4FF',
          userLabelText: '#0075D1',
          priceTextColor: '#008FFF',
          userBarLabel: '평균 이상',
          cardMessage: '연봉이 높다고 안심하긴 아직 이릅니다',
          cardDescription: '내 자산관리 습관, 진짜 괜찮을까요?',
        };
    }
  };

  const config = getResultConfig();

  // 차트 높이 계산 로직
  const BASE_HEIGHT = 100;

  const calculateBarHeights = () => {
    const { userSalary, averageSalary } = salaryData;

    if (result === 'equal') {
      // 같은 경우: 둘 다 100px
      return {
        userHeight: BASE_HEIGHT,
        averageHeight: BASE_HEIGHT,
      };
    } else if (result === 'above') {
      // 내가 높은 경우: 내가 100px, 평균은 비율에 맞게
      const ratio = averageSalary / userSalary;
      return {
        userHeight: BASE_HEIGHT,
        averageHeight: Math.round(BASE_HEIGHT * ratio),
      };
    } else {
      // 내가 낮은 경우: 평균이 100px, 내가 비율에 맞게
      const ratio = userSalary / averageSalary;
      return {
        userHeight: Math.round(BASE_HEIGHT * ratio),
        averageHeight: BASE_HEIGHT,
      };
    }
  };

  const { userHeight, averageHeight } = calculateBarHeights();

  // 차트 데이터 생성
  const chartData = [
    {
      name: '나',
      value: salaryData.userSalary,
      height: userHeight,
      color: config.userBarColor,
    },
    {
      name: '평균',
      value: salaryData.averageSalary,
      height: averageHeight,
      color: '#D9D9D9',
    },
  ];

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      {/* 헤더 섹션 */}
      <div className='flex items-end gap-12'>
        <div className='flex flex-col gap-1 w-full'>
          <h2 className='text-label-2 font-medium text-neutral-500'>
            {config.title}
          </h2>
          <div className='flex flex-col'>
            <p className='text-heading-1 font-semibold text-neutral-900'>
              {config.description}
            </p>
            <p className='text-heading-1 leading-[30px] font-semibold'>
              <span
                className='font-bold'
                style={{
                  color: config.userLabelText,
                }}
              >
                {config.percentage}
              </span>
              {config.percentageText}
            </p>
          </div>
        </div>
        <div className='w-[68px] h-[68px] flex-shrink-0'>
          <Image
            src={config.image}
            alt=''
            width={68}
            height={68}
            className='w-full h-full object-contain'
          />
        </div>
      </div>

      {/* 차트 섹션 */}
      <div className='bg-neutral-25 border border-neutral-50 rounded-[24px] px-5 py-6'>
        <div className='flex flex-col gap-6'>
          {/* 차트 */}
          <div className='flex items-end justify-center gap-14'>
            {/* 사용자 바 */}
            <div className='flex flex-col items-center gap-2'>
              <div
                className='px-2 py-1 rounded-full text-label-2 font-semibold'
                style={{
                  backgroundColor: config.userLabelBg,
                  color: config.userLabelText,
                }}
              >
                {config.userBarLabel}
              </div>
              <div
                className='w-[58px] rounded-[8px]'
                style={{
                  height: `${chartData[0].height}px`,
                  backgroundColor: chartData[0].color,
                }}
              />
              <div className='flex flex-col items-center'>
                <p
                  style={{
                    color: config.userLabelText,
                  }}
                  className='text-headline-2 font-semibold'
                >
                  {salaryData.userSalary.toLocaleString()}만원
                </p>
                <p className='text-label-2 font-medium text-neutral-500'>나</p>
              </div>
            </div>

            {/* 평균 바 */}
            <div className='flex flex-col items-center gap-2'>
              <div
                className='w-[58px] rounded-[8px]'
                style={{
                  height: `${chartData[1].height}px`,
                  backgroundColor: chartData[1].color,
                }}
              />
              <div className='flex flex-col items-center'>
                <p className='text-headline-2 font-semibold text-neutral-900'>
                  {salaryData.averageSalary.toLocaleString()}만원
                </p>
                <p className='text-label-2 font-medium text-neutral-400'>
                  동일 연차 평균
                </p>
              </div>
            </div>
          </div>

          {/* 메시지 카드 */}
          <div className='bg-neutral-0 rounded-[16px] p-5'>
            <p className='text-label-1 font-bold text-neutral-600 leading-[20px] whitespace-pre-line'>
              {config.cardMessage}
            </p>
            <p className='text-label-1 text-neutral-600 leading-[20px] whitespace-pre-line'>
              {config.cardDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryComparisonResult;
