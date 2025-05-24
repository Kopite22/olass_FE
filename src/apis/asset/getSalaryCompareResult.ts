import assetApiInstance from '@/apis/asset/assetApiInstance';

interface RawSalaryCompareResult {
  user: {
    experience: number;
    salary: number;
  };
  stat: {
    experience: number;
    lower: number;
    avg: number;
    upper: number;
  };
}

interface SalaryCompareResult {
  year: number;
  salary: number;
  higherAmount: number;
  lowerAmount: number;
  avgAmount: number;
}

const inPort = (rawJob: RawSalaryCompareResult): SalaryCompareResult => {
  return {
    year: rawJob.user.experience,
    salary: rawJob.user.salary,
    higherAmount: rawJob.stat.upper,
    lowerAmount: rawJob.stat.lower,
    avgAmount: rawJob.stat.avg,
  };
};

interface GetSalaryCompareResultBody {
  unique_id: string;
  job_id: string;
  experience: number;
  salary: number;
}

const getSalaryCompareResult = async (body: GetSalaryCompareResultBody) => {
  const response = await assetApiInstance.post<RawSalaryCompareResult>(
    'salary',
    {
      body: JSON.stringify(body),
    }
  );

  const rawSalaryCompareResult = await response.json();

  return inPort(rawSalaryCompareResult);
};

export default getSalaryCompareResult;
export type { GetSalaryCompareResultBody, SalaryCompareResult };
