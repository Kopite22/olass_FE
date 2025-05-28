'use client';

import FormCard from '@/components/common/Form/FormCard';
import FormProgress from '@/components/common/Form/FormProgress';
import { GNB } from '@/components/common/GNB';
import ShareIcon from '@/components/icons/ShareIcon';
import { Screen } from '@/components/layout/Screen';
import { Step, Steps } from '@/components/steps';
import BackStepButton from '@/components/steps/BackStepButton';

import { FormSteps } from '@/_pages/asset-management-compare-form/constants/formSteps';
import { FormProvider } from '@/_pages/asset-management-compare-form/providers/FormProvider';
import AgeStep from '@/_pages/asset-management-compare-form/steps/AgeStep';
import CarOwnershipStep from '@/_pages/asset-management-compare-form/steps/CarOwnershipStep';
import SavingsRateStep from '@/_pages/asset-management-compare-form/steps/SavingsRateStep';

const AssetManagementCompareFormPage = () => {
  return (
    <Screen className='gradient-background flex flex-col gap-4'>
      <GNB trailing={<ShareIcon />} />
      <main className='px-5 pb-6 flex-1 size-full overflow-hidden'>
        <FormProvider>
          <Steps steps={Object.values(FormSteps)} initialStep={FormSteps.Age}>
            <FormCard>
              <div className='flex flex-col gap-[18px]'>
                <BackStepButton />
                <FormProgress />
              </div>
              <Step name={FormSteps.Age}>
                <AgeStep />
              </Step>
              <Step name={FormSteps.SavingsRate}>
                <SavingsRateStep />
              </Step>
              <Step name={FormSteps.CarOwnership}>
                <CarOwnershipStep />
              </Step>
            </FormCard>
          </Steps>
        </FormProvider>
      </main>
    </Screen>
  );
};

export default AssetManagementCompareFormPage;
