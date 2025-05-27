import { FC, useMemo } from 'react';

import {
  type ValidationError,
  LocaleNumberInput,
  useNumberValidation,
} from '@/components/common/LocaleNumberInput';

interface Props {
  salary: number | null;
  onSalaryChange: (value: number) => void;
  onError?: (error: ValidationError | null, isValid: boolean) => void;
}

// 급여 입력에 특화된 상수들
const SALARY_MIN = 100; // 100만원
const SALARY_MAX = 100000; // 10억원
const LOCALE = 'ko-KR';

const SalaryInput: FC<Props> = ({ salary, onSalaryChange, onError }) => {
  // 급여 validation 로직 (내부에서 처리)
  const { validateValue } = useNumberValidation({
    min: SALARY_MIN,
    max: SALARY_MAX,
    minErrorMessage: '100만 원 이상만 입력할 수 있어요',
    maxErrorMessage: '10억 원 이하만 입력할 수 있어요',
  });

  // 현재 salary 값의 에러 상태 계산 (내부에서 처리)
  const currentError = useMemo(() => {
    if (salary === null) {
      return null;
    }
    return validateValue(salary);
  }, [salary, validateValue]);

  // LocaleNumberInput의 validation 에러를 처리
  const handleValidationError = (error: ValidationError | null) => {
    if (onError) {
      const isValid = salary !== null && error === null;
      onError(error, isValid);
    }
  };

  const handleSalaryChange = (value: number | null) => {
    // null 값은 외부로 전달하지 않음 (급여는 반드시 숫자여야 함)
    if (value === null) {
      return;
    }
    onSalaryChange(value);
  };

  return (
    <div className='flex h-72 flex-row w-full gap-2.5 items-start'>
      <LocaleNumberInput
        placeholder='0'
        value={salary}
        onChange={handleSalaryChange}
        onValidationError={handleValidationError}
        // 모든 세부사항은 내부에서 처리
        helperText={currentError?.message || null}
        error={currentError !== null}
        locale={LOCALE}
        min={SALARY_MIN}
        max={SALARY_MAX}
        minErrorMessage='100만 원 이상만 입력할 수 있어요'
        maxErrorMessage='10억 원 이하만 입력할 수 있어요'
      />
      <span className='shrink-0 pt-2.5'>만원</span>
    </div>
  );
};

export default SalaryInput;
