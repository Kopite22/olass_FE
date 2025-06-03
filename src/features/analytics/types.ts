// 로깅 설정 타입
export interface AnalyticsConfig {
  enableGTM: boolean;
  enableGA4: boolean;
  debug: boolean;
}

// 디버그 정보 타입
export interface DebugInfo {
  config: AnalyticsConfig;
  // eslint-disable-next-line
  gtmDataLayer?: Object[];
}
