import { createQueryKeys } from '@lukemorales/query-key-factory';

import getAllJobs from '@/apis/asset/getAllJobs';
import getSalaryCompareResult, {
  GetSalaryCompareResultBody,
} from '@/apis/asset/getSalaryCompareResult';
import postConsumptionGrade, {
  ConsumptionGradeParams,
} from '@/apis/asset/postConsumptionGrade';

const assetQueryKeys = createQueryKeys('asset', {
  getAllJobs: () => ({
    queryKey: ['jobs', 'all'],
    queryFn: () => getAllJobs(),
  }),
  getSalaryCompareResult: (body: GetSalaryCompareResultBody) => ({
    queryKey: ['salary', 'compare', body],
    queryFn: () => getSalaryCompareResult(body),
  }),
  postConsumptionGrade: (params: ConsumptionGradeParams) => ({
    queryKey: ['profile', params],
    queryFn: () => postConsumptionGrade(params),
  }),
});

export default assetQueryKeys;
