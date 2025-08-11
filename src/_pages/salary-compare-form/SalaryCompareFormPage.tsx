'use client';

import FormCard from '@/components/common/Form/FormCard';
import FormProgress from '@/components/common/Form/FormProgress';
import { GNB } from '@/components/common/GNB';
import ShareIcon from '@/components/icons/ShareIcon';
import { Screen } from '@/components/layout/Screen';
import { Step, Steps } from '@/components/steps';
import BackStepButton from '@/components/steps/BackStepButton';

import { FormSteps } from '@/_pages/salary-compare-form/constants/formSteps';
import { FormProvider } from '@/_pages/salary-compare-form/providers/FormProvider';
import JobStep from '@/_pages/salary-compare-form/steps/JobStep';
import SalaryStep from '@/_pages/salary-compare-form/steps/SalaryStep';
import YearStep from '@/_pages/salary-compare-form/steps/YearStep';
import { analytics } from '@/features/analytics';

export default function SalaryCompareFormPage() {
  const handleShare = () => {
    analytics.trackContentCTAClick({
      buttonType: 'share',
      eventUrl: window.location.href,
    });

    navigator.share({
      title: '내 연봉 위치 확인하기',
      text: '나랑 비슷한 사람은 얼마나 벌까?',
      url: 'https://www.olass.co.kr',
    });
  };
  return (
    <Screen className='gradient-background flex flex-col gap-4'>
      <GNB
        trailing={
          <div onClick={handleShare}>
            <ShareIcon />
          </div>
        }
      />
      <main className='px-5 pb-6 flex-1 size-full overflow-hidden'>
        <FormProvider>
          <Steps steps={Object.values(FormSteps)} initialStep={FormSteps.Job}>
            <FormCard>
              <div className='flex flex-col gap-[18px]'>
                <BackStepButton />
                <FormProgress />
              </div>
              <Step name={FormSteps.Job}>
                <JobStep />
              </Step>
              <Step name={FormSteps.Year}>
                <YearStep />
              </Step>
              <Step name={FormSteps.Salary}>
                <SalaryStep />
              </Step>
            </FormCard>
          </Steps>
        </FormProvider>
      </main>
    </Screen>
  );
}
