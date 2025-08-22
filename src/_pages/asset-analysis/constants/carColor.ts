import { ResponseCarList } from '@/apis/asset';

export const carColor: Record<ResponseCarList, string> = {
  publicTransportation: 'border-alert',
  avante: 'border-alert',
  grandeur: 'border-success',
  benz: 'border-primary-500',
  porsche: 'border-primary-500',
};

export const gradeBarInfo = {
  publicTransportation: { grade: 0, color: 'bg-coral' },
  avante: { grade: 1, color: 'bg-coral' },
  grandeur: { grade: 2, color: 'bg-success' },
  benz: { grade: 3, color: 'bg-primary-500' },
  porsche: { grade: 4, color: 'bg-primary-500' },
};
