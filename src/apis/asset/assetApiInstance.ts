import ky from 'ky';

import { getServerUrl } from '@/lib/api';

const assetApiInstance = ky.create({
  prefixUrl: `${getServerUrl()}/api/asset/v1`,
});

export default assetApiInstance;
