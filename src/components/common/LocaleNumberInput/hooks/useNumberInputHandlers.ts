import * as React from 'react';

import { type ValidationError } from './useNumberValidation';
import {
  formatNumber,
  isValidIntermediateInput,
  safeParseNumber,
} from '../utils';

export interface UseNumberInputHandlersProps {
  onChange: (value: number | null) => void;
  onValidationError?: (error: ValidationError | null) => void;
  allowDecimals?: boolean;
  maxIntegerDigits?: number;
  max?: number;
  validateValue: (value: number) => ValidationError | null;
  updateDisplayValue: (value: string) => void;
  setFocused: (focused: boolean) => void;
  showRawValue: () => void;
  showFormattedValue: () => void;
  locale?: string;
}

export const useNumberInputHandlers = ({
  onChange,
  onValidationError,
  allowDecimals = false,
  maxIntegerDigits,
  max,
  validateValue,
  updateDisplayValue,
  setFocused,
  showRawValue,
  showFormattedValue,
  locale = 'ko-KR',
}: UseNumberInputHandlersProps) => {
  const handleInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // 유효하지 않은 중간 입력은 차단
      if (!isValidIntermediateInput(inputValue, allowDecimals)) {
        return;
      }

      // 최대 정수 자릿수 체크
      if (maxIntegerDigits) {
        const cleanValue = inputValue.replace(/,/g, '');
        const integerPart = cleanValue.split('.')[0].replace('-', '');
        if (integerPart.length > maxIntegerDigits) {
          return;
        }
      }

      // 숫자로 파싱 시도
      let parsedValue = safeParseNumber(inputValue, allowDecimals);

      if (parsedValue === null) {
        // 빈 값이거나 파싱 실패한 경우 - 입력 중인 상태는 그대로 표시
        updateDisplayValue(inputValue);
        onValidationError?.(null);
        onChange(null);
        return;
      }

      // max 값 초과 시 max 값으로 제한
      if (max !== undefined && parsedValue > max) {
        parsedValue = max;
      }

      // 유효한 숫자는 포맷팅하여 표시
      updateDisplayValue(formatNumber(parsedValue, locale));

      // validation 수행
      const validationError = validateValue(parsedValue);
      onValidationError?.(validationError);

      // validation 실패 시에도 값은 전달 (min/max 처리를 위해)
      onChange(parsedValue);
    },
    [
      allowDecimals,
      maxIntegerDigits,
      onChange,
      onValidationError,
      validateValue,
      max,
      updateDisplayValue,
      locale,
    ]
  );

  const handleFocus = React.useCallback(
    (_e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      showRawValue();
    },
    [setFocused, showRawValue]
  );

  const handleBlur = React.useCallback(
    (_e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      showFormattedValue();
    },
    [setFocused, showFormattedValue]
  );

  return {
    handleInputChange,
    handleFocus,
    handleBlur,
  };
};
