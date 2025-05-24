import * as React from 'react';
import { z } from 'zod';

export interface ValidationError {
  type: 'min' | 'max' | 'invalid';
  message: string;
  value: number;
}

export interface UseNumberValidationProps {
  min?: number;
  max?: number;
  minErrorMessage?: string;
  maxErrorMessage?: string;
  invalidErrorMessage?: string;
}

export const useNumberValidation = ({
  min,
  max,
  minErrorMessage = `${min}보다 크거나 같은 값을 입력해주세요`,
  maxErrorMessage = `${max}보다 작거나 같은 값을 입력해주세요`,
  invalidErrorMessage = '유효한 숫자를 입력해주세요',
}: UseNumberValidationProps) => {
  // 동적 Zod 스키마 생성
  const validationSchema = React.useMemo(() => {
    let schema = z.number();

    if (min !== undefined) {
      schema = schema.min(min, { message: 'min' });
    }

    if (max !== undefined) {
      schema = schema.max(max, { message: 'max' });
    }

    return schema;
  }, [min, max]);

  // validation 수행 함수
  const validateValue = React.useCallback(
    (numberValue: number): ValidationError | null => {
      const result = validationSchema.safeParse(numberValue);

      if (result.success) {
        return null;
      }

      const errorType = result.error.issues[0].message as 'min' | 'max';

      switch (errorType) {
        case 'min':
          return {
            type: 'min',
            message: minErrorMessage,
            value: numberValue,
          };
        case 'max':
          return {
            type: 'max',
            message: maxErrorMessage,
            value: numberValue,
          };
        default:
          return {
            type: 'invalid',
            message: invalidErrorMessage,
            value: numberValue,
          };
      }
    },
    [validationSchema, minErrorMessage, maxErrorMessage, invalidErrorMessage]
  );

  return {
    validateValue,
  };
};
