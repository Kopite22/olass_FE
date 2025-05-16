export type StepType<T extends string = string> = {
  name: T;
  component: React.ReactNode;
};
