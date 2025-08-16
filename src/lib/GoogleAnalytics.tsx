import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';

import { GA_MEASUREMENT_ID } from '@/constant/env';

const GoogleAnalytics = () => {
  return <NextGoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
};

export default GoogleAnalytics;
