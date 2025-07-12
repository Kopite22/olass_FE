import assetApiInstance from '@/apis/asset/assetApiInstance';

interface Response {
  code: number;
  data: RawSalaryCompareResult;
  message: string;
  success: boolean;
}

interface RawSalaryCompareResult {
  jobSalary: number;
  userExperience: number;
  userSalary: number;
}

interface SalaryCompareResult {
  year: number;
  salary: number;
  higherAmount: number;
  lowerAmount: number;
  avgAmount: number;
}

const inPort = (rawJob: RawSalaryCompareResult): SalaryCompareResult => {
  const { jobSalary, userExperience, userSalary } = rawJob;

  // 유저 연봉이 평균 대비 몇 퍼센트인지 계산
  const userSalaryRatio = (userSalary / jobSalary) * 100;

  // 유저가 평균보다 얼마나 더 받는지 (평균 초과분의 퍼센트)
  const higherAmount = Math.floor(
    userSalaryRatio > 100 ? userSalaryRatio - 100 : 0
  );

  // 유저가 평균보다 얼마나 덜 받는지 (평균 미달분의 퍼센트)
  const lowerAmount = Math.floor(
    userSalaryRatio < 100 ? 100 - userSalaryRatio : 0
  );

  return {
    year: userExperience,
    salary: userSalary,
    higherAmount,
    lowerAmount,
    avgAmount: jobSalary,
  };
};

interface GetSalaryCompareResultBody {
  unique_id: string;
  job_id: number;
  experience: number;
  salary: number;
}

const getSalaryCompareResult = async (body: GetSalaryCompareResultBody) => {
  const response = await assetApiInstance.post<Response>('salary', {
    json: body,
  });

  const rawSalaryCompareResult = (await response.json()).data;

  return inPort(rawSalaryCompareResult);
};

export default getSalaryCompareResult;
export type { GetSalaryCompareResultBody, SalaryCompareResult };
