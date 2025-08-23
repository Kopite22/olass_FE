import { Metadata } from 'next';

import AssetAnalysisPage from '@/_pages/asset-analysis/AssetAnalysisPage';
import { ConsumptionGradeParams } from '@/apis/asset/postConsumptionGrade';
import { generateCommonMetadata } from '@/entities/utils/generateMetadata';

interface PageProps {
  searchParams: {
    unique_id?: string;
    age?: string;
    hasCar?: string;
    isMonthlyRent?: string;
    saveRate?: string;
  };
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  return generateCommonMetadata({
    path: `/asset-analysis?${searchParams.toString()}`,
    searchParams,
  });
}

const Page = ({ searchParams }: PageProps) => {
  if (
    !searchParams.unique_id ||
    !searchParams.age ||
    !searchParams.hasCar ||
    !searchParams.isMonthlyRent ||
    !searchParams.saveRate
  ) {
    throw new Error('필수 파라미터가 누락되었습니다.');
  }

  const requestBody: ConsumptionGradeParams = {
    uniqueId: searchParams.unique_id,
    age: parseInt(searchParams.age, 10),
    hasCar: searchParams.hasCar === 'true',
    isMonthlyRent: searchParams.isMonthlyRent === 'true',
    saveRate: parseInt(searchParams.saveRate, 10),
  };

  return <AssetAnalysisPage {...requestBody} />;
};

export default Page;
