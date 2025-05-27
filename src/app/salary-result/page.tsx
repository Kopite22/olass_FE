import SalaryResultPage from '@/_pages/salary-result/SalaryResultPage';
import { GetSalaryCompareResultBody } from '@/apis/asset/getSalaryCompareResult';

interface PageProps {
  searchParams: {
    unique_id?: string;
    job_id?: string;
    experience?: string;
    salary?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  // URL 파라미터 검증
  if (
    !searchParams.unique_id ||
    !searchParams.job_id ||
    !searchParams.experience ||
    !searchParams.salary
  ) {
    throw new Error('필수 파라미터가 누락되었습니다.');
  }

  const requestBody: GetSalaryCompareResultBody = {
    unique_id: searchParams.unique_id,
    job_id: parseInt(searchParams.job_id),
    experience: parseInt(searchParams.experience, 10),
    salary: parseInt(searchParams.salary, 10),
  };

  return <SalaryResultPage {...requestBody} />;
}
