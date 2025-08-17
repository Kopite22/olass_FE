import SalaryResultPage from '@/_pages/salary-result/SalaryResultPage';
import { GetSalaryCompareResultBody } from '@/apis/asset/getSalaryCompareResult';

interface PageProps {
  searchParams: {
    uniqueId?: string;
    jobId?: string;
    experience?: string;
    salary?: string;
  };
}

export default async function Page({ searchParams }: PageProps) {
  // URL 파라미터 검증
  if (
    !searchParams.uniqueId ||
    !searchParams.jobId ||
    !searchParams.experience ||
    !searchParams.salary
  ) {
    throw new Error('필수 파라미터가 누락되었습니다.');
  }

  const requestBody: GetSalaryCompareResultBody = {
    uniqueId: searchParams.uniqueId,
    jobId: parseInt(searchParams.jobId),
    experience: parseInt(searchParams.experience, 10),
    salary: parseInt(searchParams.salary, 10),
  };

  return <SalaryResultPage {...requestBody} />;
}
