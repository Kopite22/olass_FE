import * as React from 'react';

import { formatNumber } from '../utils';

export interface UseDisplayValueProps {
  value: number | null;
  locale?: string;
}

export const useDisplayValue = ({
  value,
  locale = 'ko-KR',
}: UseDisplayValueProps) => {
  // 표시용 값과 포커스 상태 관리
  const [displayValue, setDisplayValue] = React.useState(() =>
    formatNumber(value, locale)
  );
  const [isFocused, setIsFocused] = React.useState(false);

  // props로 받은 value가 변경될 때 displayValue 업데이트 (항상 포맷팅 적용)
  React.useEffect(() => {
    setDisplayValue(formatNumber(value, locale));
  }, [value, locale]);

  // 포커스 상태 변경 함수들
  const setFocused = React.useCallback((focused: boolean) => {
    setIsFocused(focused);
  }, []);

  // 표시값 직접 설정 함수 - 유효한 숫자는 즉시 포맷팅
  const updateDisplayValue = React.useCallback((newDisplayValue: string) => {
    setDisplayValue(newDisplayValue);
  }, []);

  // 포커스 시에도 포맷팅된 값 유지 (변경 없음)
  const showRawValue = React.useCallback(() => {
    // 실시간 포맷팅 모드에서는 이미 포맷팅된 상태 유지
  }, []);

  // 블러 시에도 포맷팅된 값 유지 (이미 적용되어 있음)
  const showFormattedValue = React.useCallback(() => {
    setDisplayValue(formatNumber(value, locale));
  }, [value, locale]);

  return {
    displayValue,
    isFocused,
    setFocused,
    updateDisplayValue,
    showRawValue,
    showFormattedValue,
  };
};
