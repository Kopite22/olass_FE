import ky from 'ky';

import { getServerUrl } from '@/lib/api';

const userApiInstance = ky.create({
  prefixUrl: `${getServerUrl()}/api/user/v1`,
});

export default userApiInstance;
