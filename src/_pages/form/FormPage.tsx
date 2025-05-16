'use client';

import ShareIcon from '@/components/icons/ShareIcon';
import Screen from '@/components/layout/Screen';
import { Step, Steps } from '@/components/steps';
import { GNB } from '@/components/ui/GNB';

import FormCard from '@/_pages/form/components/FormCard';
import FormProgress from '@/_pages/form/components/FormProgress';
import { FormSteps } from '@/_pages/form/constants/formSteps';
import JobStep from '@/_pages/form/steps/JobStep';

export default function FormPage() {
  return (
    <Screen className='gradient-background flex flex-col gap-4'>
      <GNB trailing={<ShareIcon />} />
      <main className='px-5 pb-6 size-full'>
        <Steps<FormSteps> initialStep={FormSteps.Job}>
          <FormCard>
            <FormProgress />
            <Step name={FormSteps.Job}>
              <JobStep />
            </Step>
          </FormCard>
        </Steps>
      </main>
    </Screen>
  );
}
