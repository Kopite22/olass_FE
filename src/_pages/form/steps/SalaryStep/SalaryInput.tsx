import { isNumber } from 'es-toolkit/compat';
import { FC } from 'react';
import { z } from 'zod';

import { Input } from '@/components/common/Input';

interface Props {
  onSalaryChange: (value: number) => void;
  salary: number | null;
  error: string | null;
  setError: (error: string | null) => void;
}

enum SalaryError {
  Invalid = 'Invalid',
  Min = 'Min',
  Max = 'Max',
}

function getErrorMessage(error: SalaryError) {
  switch (error) {
    case SalaryError.Invalid:
      return '숫자만 입력해주세요';
    case SalaryError.Min:
      return '100만 원 이상만 입력할 수 있어요';
    case SalaryError.Max:
      return '10억 원 이하만 입력할 수 있어요';
    default:
      return null;
  }
}

const SALARY_MIN = 100; // 100만원
const SALARY_MAX = 100000; // 10억

const salarySchema = z
  .number()
  .min(SALARY_MIN, SalaryError.Min)
  .max(SALARY_MAX, SalaryError.Max);

const SalaryInput: FC<Props> = ({
  salary,
  onSalaryChange,
  error,
  setError,
}) => {
  const handleSalaryChange = (value: string) => {
    if (error !== null) {
      setError(null);
    }

    const decommaizedValue = value.replace(/,/g, '');

    const parsedValue = Number(decommaizedValue);

    if (!isNumber(parsedValue) || isNaN(parsedValue)) {
      return setError(getErrorMessage(SalaryError.Invalid));
    }

    const validationResult = salarySchema.safeParse(parsedValue);

    if (validationResult.success) {
      return onSalaryChange(validationResult.data);
    }

    const errorMessage = validationResult.error.issues[0].message;

    if (errorMessage === SalaryError.Min) {
      setError(getErrorMessage(SalaryError.Min));
      return onSalaryChange(parsedValue);
    }

    if (errorMessage === SalaryError.Max) {
      setError(getErrorMessage(SalaryError.Max));
      return onSalaryChange(SALARY_MAX);
    }
  };

  return (
    <div className='flex h-72 flex-row w-full gap-2.5 items-start'>
      <Input
        placeholder='0'
        value={salary?.toLocaleString('kr') ?? undefined}
        helperText={error}
        type='text'
        inputMode='numeric'
        pattern='[0-9]*'
        onChange={(e) => handleSalaryChange(e.target.value)}
        error={error !== null}
      />
      <span className='shrink-0 pt-2.5'>만원</span>
    </div>
  );
};

export default SalaryInput;
