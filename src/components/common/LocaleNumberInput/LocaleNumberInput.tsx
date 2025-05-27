import * as React from 'react';

import { Input, InputProps } from '@/components/common/Input';

import {
  type ValidationError,
  useDisplayValue,
  useNumberInputHandlers,
  useNumberValidation,
} from './hooks';

export interface LocaleNumberInputProps
  extends Omit<InputProps, 'value' | 'onChange' | 'type'> {
  value: number | null;
  onChange: (value: number | null) => void;
  onValidationError?: (error: ValidationError | null) => void;
  locale?: string;
  allowDecimals?: boolean;
  maxIntegerDigits?: number;
  min?: number;
  max?: number;
  minErrorMessage?: string;
  maxErrorMessage?: string;
  invalidErrorMessage?: string;
}

const LocaleNumberInput = React.forwardRef<
  HTMLInputElement,
  LocaleNumberInputProps
>(
  (
    {
      value,
      onChange,
      onValidationError,
      locale = 'ko-KR',
      allowDecimals = false,
      maxIntegerDigits,
      min,
      max,
      minErrorMessage,
      maxErrorMessage,
      invalidErrorMessage,
      onFocus,
      onBlur,
      ...props
    }: LocaleNumberInputProps,
    ref
  ) => {
    // 각 기능별 훅들을 직접 사용
    const { validateValue } = useNumberValidation({
      min,
      max,
      minErrorMessage,
      maxErrorMessage,
      invalidErrorMessage,
    });

    const {
      displayValue,
      setFocused,
      updateDisplayValue,
      showRawValue,
      showFormattedValue,
    } = useDisplayValue({
      value,
      locale,
    });

    const { handleInputChange, handleFocus, handleBlur } =
      useNumberInputHandlers({
        onChange,
        onValidationError,
        allowDecimals,
        maxIntegerDigits,
        max,
        validateValue,
        updateDisplayValue,
        setFocused,
        showRawValue,
        showFormattedValue,
        locale,
      });

    const combinedHandleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      handleFocus(e);
      onFocus?.(e);
    };

    const combinedHandleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      handleBlur(e);
      onBlur?.(e);
    };

    return (
      <Input
        {...props}
        ref={ref}
        type='text'
        inputMode='numeric'
        pattern='[0-9]*'
        value={displayValue}
        onChange={handleInputChange}
        onFocus={combinedHandleFocus}
        onBlur={combinedHandleBlur}
      />
    );
  }
);

LocaleNumberInput.displayName = 'LocaleNumberInput';

export { LocaleNumberInput };
