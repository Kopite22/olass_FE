import { createContext, PropsWithChildren, useContext, useState } from 'react';

import { Job } from '@/apis/asset';

interface FormState {
  formData: {
    job: Job | null;
    year: number | null;
    salary: number | null;
  };
  setFormData: (data: Partial<FormState['formData']>) => void;
}

const FormContext = createContext<FormState | null>(null);

export const FormProvider = ({ children }: PropsWithChildren) => {
  const [formData, setFormData] = useState<FormState['formData']>({
    job: null,
    year: null,
    salary: null,
  });

  const updateFormData = (data: Partial<FormState['formData']>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <FormContext.Provider value={{ formData, setFormData: updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm은 FormProvider 안에서만 사용할 수 있습니다.');
  }
  return context;
};
