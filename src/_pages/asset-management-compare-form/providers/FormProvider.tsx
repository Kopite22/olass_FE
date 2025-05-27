import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface FormState {
  formData: {
    age: number | null;
  };
  setFormData: (data: Partial<FormState['formData']>) => void;
}

const FormContext = createContext<FormState | null>(null);

export const FormProvider = ({ children }: PropsWithChildren) => {
  const [formData, setFormData] = useState<FormState['formData']>({
    age: null,
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
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
