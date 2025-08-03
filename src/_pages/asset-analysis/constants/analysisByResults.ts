import carColor from '@/_pages/asset-analysis/constants/carColor';
import { ResponseCarList } from '@/apis/asset';

export const analysisByResults: Record<
  ResponseCarList,
  {
    grade: string;
    rank: string;
    rankColor: string;
    ifKeep: { title: string; content: string }[];
    nowCanChangeTitle?: string;
    nowCanChange: { title: string; content: string }[];
  }
> = {
  publicTransportation: {
    grade: '대중교통',
    rank: 'lower',
    rankColor: carColor.publicTransportation,
    ifKeep: [
      {
        title: '월급은 받자마자 다 써버리게 돼요',
        content: '집 사고 차 바꾸는 친구들 사이에서 나만 제자리일 수 있어요.',
      },
      {
        title: '돈 걱정이 늘 따라붙어요',
        content: '뭘 하든 통장 잔고부터 확인하게 될 거예요.',
      },
      {
        title: '인생의 중요한 결정을 자꾸 미루게 돼요',
        content:
          '자가 구매, 결혼, 노후 준비 같은 인생의 큰 결정을 계속 미루게 될 수 있어요.',
      },
    ],
    nowCanChange: [
      {
        title: '월급의 30%는 먼저 떼어두세요',
        content:
          '저축은 남은 돈으로 하는 것이 아니라 먼저 떼어놓는 것이에요. 월급의 30%는 자동이체로 분리해보세요.',
      },
      {
        title: '돈이 어디로 새는지부터 살펴보세요',
        content:
          'Olass의 뚜벅이 유저 83%는 자신의 소비 내역을 정확히 인지하지 못했어요. 지출을 카테고리별로 나눠보면 새는 돈이 보이기 시작해요',
      },
    ],
  },
  avante: {
    grade: '아반떼',
    rank: 'lower',
    rankColor: carColor.avante,
    ifKeep: [
      {
        title: '그랜저 타는 동기, 나는 아직 아반떼',
        content: '비슷한 연봉이라도 자산 관리에 따라 결과는 크게 달라져요.',
      },
      {
        title: '같은 월급, 다른 삶',
        content: '누군가는 내 집을 마련하고, 누군가는 여전히 월급을 다 써요.',
      },
      {
        title: '아반떼에 머무를 건가요?',
        content: '지금처럼 소비하면, 선택의 자유는 멀어집니다.',
      },
    ],
    nowCanChange: [
      {
        title: '소득의 40%, 먼저 저축하세요',
        content:
          '아반떼를 넘어서려면 더 과감한 전략이 필요해요. 매달 자동이체를 설정해 먼저 저축하고 남은 돈으로 소비하는 흐름으로 바꿔보세요.',
      },
      {
        title: "'중산 착시' 소비, 점검해보셨나요?",
        content:
          "Olass의 유저 중 아반떼를 살 수 있는 사람의 72%가 불필요한 소비를 '여유'로 착각하고 있었어요. 지출을 카테고리별로 나눠보면, 생각보다 새는 돈이 많을지도 몰라요.",
      },
    ],
  },
  grandeur: {
    grade: '그랜저',
    rank: 'mid',
    rankColor: carColor.grandeur,
    ifKeep: [
      {
        title: '지금 속도면, 그랜저도 문제 없어요',
        content: '하지만 인생은 언제나 예외로 찾아옵니다.',
      },
      {
        title: '예상 못한 지출이 계획을 흔들 수 있어요',
        content: '결혼, 이사, 부모님 지원… 준비하지 않으면 휘청일 수 있습니다.',
      },
      {
        title: '지금 상상한 미래가 꼭 현실이 되진 않아요',
        content: '지금부터 자산 흐름을 더 견고하게 만들어야 할 때입니다.',
      },
    ],
    nowCanChange: [
      {
        title: '예상 가능한 리스크부터 계산에 넣으세요',
        content:
          '단순한 수입·지출 계산만으론 부족해요. Olass는 연령, 직군, 지출 데이터를 바탕으로 인생에서마주할 수 있는 리스크를 미리 계산해드려요.',
      },
      {
        title: '자산 흐름 전체를 살펴보세요',
        content:
          '지금 저축을 잘하고 있다고 안심하긴 이르죠. 중요한 건 자산이 얼마나 자라고 있는지예요. 일정한 속도로 쌓이지 않는다면, 5년 내 목표 달성도 멀어질 수 있어요.',
      },
    ],
  },
  benz: {
    grade: '벤츠',
    rank: 'upper',
    rankColor: carColor.benz,
    ifKeep: [
      {
        title: '지금처럼만 가면, 벤츠도 멀지 않아요',
        content: '조용히 자산 격차를 만들어내는 10% 안에 들어있어요.',
      },
      {
        title: '상위 10%의 재무 습관을 실천 중이에요',
        content: 'Olass 데이터 기준, 이런 습관을 가진 사람은 9.8%뿐입니다.',
      },
      {
        title: '누군가는 지금 당신의 루트를 부러워해요',
        content: '이대로라면 5년 뒤에는 또래와 격차가 생깁니다.',
      },
    ],
    nowCanChangeTitle: '하지만 상위 1%로 가기 위해 필요한 것은?',
    nowCanChange: [
      {
        title: '전략적인 투자로 방향을 전환해보세요',
        content:
          '소비를 줄이는 단계는 충분히 지나왔어요. 이제는 근로소득을 넘어, 금융소득이 자산 형성에 기여하는 흐름으로 바꿔야 할 시점이에요.',
      },
      {
        title: '안정성보다 성장성이 중요한 시기입니다',
        content:
          '벤츠를 현실로 만드는 건 안정적이기만 한 설계로는 부족해요. Olass는 당신의 자산 흐름을 바탕으로, 안정성과 수익률을 모두 고려한 투자 포트폴리오를 추천해드려요.',
      },
    ],
  },
  porsche: {
    grade: '포르쉐',
    rank: 'upper',
    rankColor: carColor.porsche,
    ifKeep: [
      {
        title: '지금처럼만 해도, 드림카는 멀지 않아요',
        content: '10년 뒤, 지금 그리던 차를 실제로 몰고 있을 가능성, 충분해요.',
      },
      {
        title: '이미 경제적 자유에 가까워지고 있어요',
        content:
          'Olass 데이터 기준, 이 수준의 재무 습관을 가진 사람은 3%도 되지 않아요.',
      },
      {
        title: '더 이상 꿈으로만 남기지 마세요',
        content: '당신은 극소수만이 오르는 궤도에 올라와 있어요.',
      },
    ],
    nowCanChangeTitle: '지금 자산 흐름, 더 탄탄하게 이어가려면?',
    nowCanChange: [
      {
        title: '자산 방어력을 키워야 해요',
        content:
          '목표를 이루는 것보다, 지켜내는 게 더 어려워요. Olass는 지출 리스크, 건강 문제, 소득 단절 같은 위기 상황을 시뮬레이션해 당신만의 방어 전략을 설계해드려요.',
      },
      {
        title: '자산의 속도를 늦추지 마세요',
        content:
          '지금의 상승 흐름이 유지된다면, 포르쉐는 결과일 뿐이에요. 하지만 속도가 꺾이면, 그 지점에 다시 닿기 어려워져요. Olass는 분산 투자 전략으로 꾸준한 성장을 돕습니다.',
      },
    ],
  },
};
