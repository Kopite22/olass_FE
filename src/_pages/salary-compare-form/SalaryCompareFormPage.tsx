'use client';

import { GNB } from '@/components/common/GNB';
import ShareIcon from '@/components/icons/ShareIcon';
import { Screen } from '@/components/layout/Screen';
import { Step, Steps } from '@/components/steps';

import BackStepButton from '@/_pages/salary-compare-form/components/BackStepButton';
import FormCard from '@/_pages/salary-compare-form/components/FormCard';
import FormProgress from '@/_pages/salary-compare-form/components/FormProgress';
import { FormSteps } from '@/_pages/salary-compare-form/constants/formSteps';
import { FormProvider } from '@/_pages/salary-compare-form/providers/FormProvider';
import JobStep from '@/_pages/salary-compare-form/steps/JobStep';
import SalaryStep from '@/_pages/salary-compare-form/steps/SalaryStep';
import YearStep from '@/_pages/salary-compare-form/steps/YearStep';

export default function SalaryCompareFormPage() {
  return (
    <Screen className='gradient-background flex flex-col gap-4'>
      <GNB trailing={<ShareIcon />} />
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
