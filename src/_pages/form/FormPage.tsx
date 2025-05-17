'use client';

import { GNB } from '@/components/common/GNB';
import ShareIcon from '@/components/icons/ShareIcon';
import Screen from '@/components/layout/Screen';
import { Step, Steps } from '@/components/steps';

import FormCard from '@/_pages/form/components/FormCard';
import FormProgress from '@/_pages/form/components/FormProgress';
import { FormSteps } from '@/_pages/form/constants/formSteps';
import { FormProvider } from '@/_pages/form/providers/FormProvider';
import JobStep from '@/_pages/form/steps/JobStep';

export default function FormPage() {
  return (
    <Screen className='gradient-background flex flex-col gap-4'>
      <GNB trailing={<ShareIcon />} />
      <main className='px-5 pb-6 size-full'>
        <FormProvider>
          <Steps steps={Object.values(FormSteps)} initialStep={FormSteps.Job}>
            <FormCard>
              <FormProgress />
              <Step name={FormSteps.Job}>
                <JobStep />
              </Step>
            </FormCard>
          </Steps>
        </FormProvider>
      </main>
    </Screen>
  );
}
