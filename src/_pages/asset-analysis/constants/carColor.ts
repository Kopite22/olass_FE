import { ResponseCarList } from '@/apis/asset';

const carColor: Record<ResponseCarList, string> = {
  publicTransportation: 'alert',
  avante: 'alert',
  grandeur: 'success',
  benz: 'primary-500',
  porsche: 'primary-500',
};

export default carColor;
