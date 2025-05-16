import Image from 'next/image';

export default function LandingImage() {
  return (
    <div className='flex items-center justify-center p-[10px]'>
      <div className='relative w-[177px] h-[177px]'>
        <Image
          src='/images/Illustration.png'
          alt='랜딩 페이지 일러스트레이션'
          fill
          style={{ objectFit: 'fill' }}
          priority
        />
      </div>
    </div>
  );
}
