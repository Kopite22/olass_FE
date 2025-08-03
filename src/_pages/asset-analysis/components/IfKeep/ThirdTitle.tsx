import { ResponseCarList } from '@/apis/asset';

interface Props {
  car: ResponseCarList;
}

const ThirdTitle = ({ car }: Props) => {
  if (car === 'publicTransportation') {
    return (
      <>
        <span className='text-alert'>인생의 중요한 결정</span>을 자꾸 미루게
        돼요
      </>
    );
  }
  if (car === 'avante') {
    return (
      <>
        <span className='text-alert'>아반떼에 머무를 건가요?</span>
      </>
    );
  }
  if (car === 'grandeur') {
    return (
      <>
        지금 상상한 미래가{' '}
        <span className='text-success'>인생의 중요한 결정</span>
      </>
    );
  }
  if (car === 'benz') {
    return '누군가는 지금 당신의 루트를 부러워해요';
  }

  return "더 이상 '꿈'으로만 남기지 마세요.";
};

export default ThirdTitle;
