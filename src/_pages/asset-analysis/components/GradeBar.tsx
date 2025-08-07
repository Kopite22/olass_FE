import carColor from '@/_pages/asset-analysis/constants/carColor';
import { ResponseCarList } from '@/apis/asset';

interface Props {
  car: ResponseCarList;
}

const gradeBarInfo = {
  publicTransportation: { grade: 0, color: 'bg-coral' },
  avante: { grade: 1, color: 'bg-coral' },
  grandeur: { grade: 2, color: 'bg-success' },
  benz: { grade: 3, color: 'bg-primary-500' },
  porsche: { grade: 4, color: 'bg-primary-500' },
};

const GradeBar = ({ car }: Props) => {
  return (
    <div
      className={`flex px-5 py-3 border-1 border-${carColor[car]} rounded-full gap-2 items-center`}
    >
      <p className='font-medium text-[13px] shrink-0'>대중교통</p>
      <div className='flex gap-0.5 h-2 w-full rounded-full overflow-hidden'>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div
            key={idx}
            className={`flex flex-1 ${
              gradeBarInfo[car].grade >= idx
                ? gradeBarInfo[car].color
                : 'bg-neutral-100'
            }`}
          />
        ))}
      </div>
      <p className='font-medium text-[13px] shrink-0'>포르쉐</p>
    </div>
  );
};

export default GradeBar;
