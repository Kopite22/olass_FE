import { FC, useMemo } from 'react';

import {
  type ValidationError,
  LocaleNumberInput,
  useNumberValidation,
} from '@/components/common/LocaleNumberInput';

interface Props {
  age: number | null;
  onAgeChange: (value: number) => void;
  onError?: (error: ValidationError | null, isValid: boolean) => void;
}

// 나이 입력에 특화된 상수들
const AGE_MIN = 20; // 20세
const AGE_MAX = 45; // 100세
const LOCALE = 'ko-KR';

const AgeInput: FC<Props> = ({ age, onAgeChange, onError }) => {
  // 나이 validation 로직
  const { validateValue } = useNumberValidation({
    min: AGE_MIN,
    max: AGE_MAX,
    minErrorMessage: '20살 이상, 45살 이하로 입력해주세요',
    maxErrorMessage: '20살 이상, 45살 이하로 입력해주세요',
  });

  // 현재 age 값의 에러 상태 계산
  const currentError = useMemo(() => {
    if (age === null) {
      return null;
    }
    return validateValue(age);
  }, [age, validateValue]);

  // LocaleNumberInput의 validation 에러를 처리
  const handleValidationError = (error: ValidationError | null) => {
    if (onError) {
      const isValid = age !== null && error === null;
      onError(error, isValid);
    }
  };

  const handleAgeChange = (value: number | null) => {
    // null 값은 외부로 전달하지 않음 (나이는 반드시 숫자여야 함)
    if (value === null) {
      return;
    }
    onAgeChange(value);
  };

  return (
    <div className='flex h-72 flex-row w-full gap-2.5 items-start'>
      <LocaleNumberInput
        placeholder='0'
        value={age}
        onChange={handleAgeChange}
        onValidationError={handleValidationError}
        helperText={currentError?.message || null}
        error={currentError !== null}
        locale={LOCALE}
        min={AGE_MIN}
        max={AGE_MAX}
        minErrorMessage='20살 이상, 45살 이하로 입력해주세요'
        maxErrorMessage='20살 이상, 45살 이하로 입력해주세요'
      />
      <span className='shrink-0 pt-2.5'>세</span>
    </div>
  );
};

export default AgeInput; 