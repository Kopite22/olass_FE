import assetApiInstance from '@/apis/asset/assetApiInstance';

interface Response {
  code: number;
  data: ConsumptionGrade;
  message: string;
  success: boolean;
}

type ResponseCarList = 'bus' | 'avante' | 'grandeur' | 'benz' | 'porsche';

interface ConsumptionGrade {
  car: ResponseCarList;
  percentage: number;
}

interface ConsumptionGradeParams {
  age: number;
  hasCar: boolean;
  isMonthlyRent: boolean;
  saveRate: number;
  uniqueId: string;
}

const postConsumptionGrade = async (params: ConsumptionGradeParams) => {
  const response = await assetApiInstance.post<Response>('profile', {
    json: params,
  });

  const consumptionGrade = (await response.json()).data;

  return consumptionGrade;
};

export default postConsumptionGrade;
export type { ConsumptionGrade, ConsumptionGradeParams, ResponseCarList };
