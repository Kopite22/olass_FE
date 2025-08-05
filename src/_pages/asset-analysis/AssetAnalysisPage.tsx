'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

import { GNB } from '@/components/common/GNB';
import ShareNetworkIcon from '@/components/icons/ShareNetworkIcon';
import { Screen } from '@/components/layout/Screen';

import EmailForm from '@/_pages/asset-analysis/components/EmailForm';
import GradeBar from '@/_pages/asset-analysis/components/GradeBar';
import IfKeep from '@/_pages/asset-analysis/components/IfKeep';
import ModalAgree from '@/_pages/asset-analysis/components/ModalAgree';
import {
  SummaryLower,
  SummaryMid,
  SummaryUpper,
} from '@/_pages/asset-analysis/components/Summary';
import { analysisByResults } from '@/_pages/asset-analysis/constants/analysisByResults';
import { assetQueryKeys } from '@/apis/asset';
import {
  ConsumptionGradeParams,
  ResponseCarList,
} from '@/apis/asset/postConsumptionGrade';

const carImage: { [key in ResponseCarList]: string } = {
  publicTransportation: '/images/bus.png',
  avante: '/images/avante.png',
  grandeur: '/images/grandeur.png',
  benz: '/images/benz.png',
  porsche: '/images/porsche.png',
};

const carSummary: { [key in ResponseCarList]: React.ReactNode } = {
  publicTransportation: <SummaryLower car='publicTransportation' />,
  avante: <SummaryLower car='avante' />,
  grandeur: <SummaryMid />,
  benz: <SummaryUpper car='benz' />,
  porsche: <SummaryUpper car='porsche' />,
};

const AssetAnalysisPage = (props: ConsumptionGradeParams) => {
  const [email, setEmail] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);

  const handleModal = () => {
    setIsShowModal((prev) => !prev);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const { data } = useSuspenseQuery(assetQueryKeys.postConsumptionGrade(props));

  return (
    <Screen className='flex flex-col gap-2 overflow-auto'>
      <div
        className={`relative flex flex-1 flex-col bg-gradient-${
          analysisByResults[data.car].rank
        } pb-9`}
      >
        <GNB trailing={<ShareNetworkIcon />} />
        <div className='flex flex-col mx-auto text-center gap-5'>
          <div className='flex flex-col'>
            <span className='text-[15px]'>내 자산 관리 습관 등급은</span>
            <span className='text-[32px] font-bold'>
              {analysisByResults[data.car].grade}
            </span>
          </div>
          <div
            className={`rounded-full px-2.5 py-1 bg-${
              analysisByResults[data.car].rankColor
            } w-fit`}
          >
            <span className='text-[16px] font-semibold text-neutral-0'>
              또래 대비{' '}
              {analysisByResults[data.car].rank === 'lower' ? '하위' : '상위'}{' '}
              {data.percentage <= 10 ? 10 : data.percentage}%
            </span>
          </div>
        </div>

        {/* car image */}
        <Image
          className='mx-auto'
          src={carImage[data.car]}
          alt='publicTransportation'
          width={325}
          height={327}
        />

        {/* 등급 */}
        <div className='px-5 w-full'>
          <GradeBar car={data.car} />
        </div>

        {/* 평가 요약 */}
        <div className='px-5'>{carSummary[data.car]}</div>

        {/* if keep */}
        <IfKeep car={data.car} />

        {/* now */}
        <div className='mt-12 flex flex-col gap-5 mx-5'>
          <span className='text-[20px] font-bold'>
            {analysisByResults[data.car].nowCanChangeTitle ??
              '지금부터 바꿔볼 수 있어요'}
          </span>
          <div className='flex flex-col gap-6'>
            {analysisByResults[data.car].nowCanChange.map((item, idx) => (
              <div key={item.title} className='flex gap-4'>
                <span className='w-[22px] h-[22px] text-center rounded-sm bg-neutral-50 text-neutral-500'>
                  {idx + 1}
                </span>
                <div className='flex flex-col'>
                  <span className='text-[18px] font-semibold'>
                    {item.title}
                  </span>
                  <span className='font-[15px] text-neutral-700'>
                    {item.content}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        {isShowModal ? (
          <ModalAgree
            email={email}
            uniqueId={props.uniqueId}
            onClose={handleModal}
          />
        ) : (
          <EmailForm
            email={email}
            onChangeEmail={handleEmailChange}
            onShowModal={handleModal}
          />
        )}
      </div>
    </Screen>
  );
};

export default AssetAnalysisPage;
