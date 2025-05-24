import { createQueryKeys } from '@lukemorales/query-key-factory';

import getAllJobs from '@/apis/asset/getAllJobs';
import getSalaryCompareResult, {
  GetSalaryCompareResultBody,
} from '@/apis/asset/getSalaryCompareResult';

const assetQueryKeys = createQueryKeys('asset', {
  getAllJobs: () => ({
    queryKey: ['jobs', 'all'],
    queryFn: () => getAllJobs(),
  }),
  getSalaryCompareResult: (body: GetSalaryCompareResultBody) => ({
    queryKey: ['salary', 'compare', body],
    queryFn: () => getSalaryCompareResult(body),
  }),
});

export default assetQueryKeys;
