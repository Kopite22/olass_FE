export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true';

export const GA_MEASUREMENT_ID =
  (isProd
    ? process.env.GA_MEASUREMENT_ID
    : process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) || '';
export const GOOGLE_TAG_MANGER_ID =
  (isProd
    ? process.env.GOOGLE_TAG_MANAGER_ID
    : process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID) || '';
