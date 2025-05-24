/**
 * 안전한 숫자 파싱 함수
 * Number() 함수와 달리 엄격한 검증을 수행합니다.
 */
export const safeParseNumber = (
  value: string,
  allowDecimals = false
): number | null => {
  // 빈 문자열이나 공백만 있는 경우
  if (!value || value.trim() === '') {
    return null;
  }

  // 콤마 제거
  const cleanValue = value.replace(/,/g, '');

  // 소수점 허용 여부에 따른 정규식 패턴
  const pattern = allowDecimals ? /^-?\d+(\.\d+)?$/ : /^-?\d+$/;

  // 정규식 패턴 검증
  if (!pattern.test(cleanValue)) {
    return null;
  }

  // parseFloat 사용 (parseInt보다 더 정확함)
  const parsed = parseFloat(cleanValue);

  // NaN이나 Infinity 체크
  if (isNaN(parsed) || !isFinite(parsed)) {
    return null;
  }

  return parsed;
};

/**
 * 숫자를 locale 형태 문자열로 변환
 */
export const formatNumber = (
  value: number | null,
  locale = 'ko-KR'
): string => {
  if (value === null || value === undefined) {
    return '';
  }

  return value.toLocaleString(locale);
};

/**
 * 입력 중인 값이 유효한 중간 상태인지 확인
 * 엄격한 검증으로 잘못된 형태의 입력을 차단합니다.
 */
export const isValidIntermediateInput = (
  value: string,
  allowDecimals = false
): boolean => {
  if (!value) return true;

  // 마이너스는 첫 번째 위치에만 허용
  if (value.includes('-') && value.indexOf('-') !== 0) {
    return false;
  }

  // 소수점이 허용되지 않는 경우 소수점 입력 차단
  if (!allowDecimals && value.includes('.')) {
    return false;
  }

  // 소수점이 2개 이상 있는 경우 차단
  const dotCount = (value.match(/\./g) || []).length;
  if (dotCount > 1) {
    return false;
  }

  // 콤마 제거 후 검증
  const cleanValue = value.replace(/,/g, '');

  // 빈 문자열이나 마이너스만 있는 경우는 허용 (입력 중)
  if (cleanValue === '' || cleanValue === '-') {
    return true;
  }

  // 소수점으로 시작하는 경우는 허용하지 않음
  if (cleanValue.startsWith('.') || cleanValue.startsWith('-.')) {
    return false;
  }

  // 소수점으로 끝나는 경우는 허용 (입력 중)
  if (cleanValue.endsWith('.')) {
    const beforeDot = cleanValue.slice(0, -1);
    return /^-?\d+$/.test(beforeDot);
  }

  // 일반적인 숫자 패턴 검증
  const pattern = allowDecimals ? /^-?\d+(\.\d*)?$/ : /^-?\d+$/;

  return pattern.test(cleanValue);
};
