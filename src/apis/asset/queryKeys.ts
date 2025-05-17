import { createQueryKeys } from '@lukemorales/query-key-factory';

import getAllJobs from '@/apis/asset/getAllJobs';

const assetQueryKeys = createQueryKeys('asset', {
  getAllJobs: () => ({
    queryKey: ['jobs', 'all'],
    queryFn: () => getAllJobs(),
  }),
});

export default assetQueryKeys;
