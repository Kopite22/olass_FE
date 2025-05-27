import type { Meta, StoryObj } from '@storybook/react';

import SalaryComparisonResult from '@/_pages/salary-result/components/SalaryComparisonResult';

const meta: Meta<typeof SalaryComparisonResult> = {
  title: 'Components/SalaryComparisonResult',
  component: SalaryComparisonResult,
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    result: {
      control: { type: 'select' },
      options: ['below', 'equal', 'above'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Below: Story = {
  args: {
    result: 'below',
    salaryData: {
      userSalary: 30000000,
      averageSalary: 34900000,
      percentage: 14,
    },
  },
};

export const Equal: Story = {
  args: {
    result: 'equal',
    salaryData: {
      userSalary: 34900000,
      averageSalary: 34900000,
      percentage: 0,
    },
  },
};

export const Above: Story = {
  args: {
    result: 'above',
    salaryData: {
      userSalary: 40000000,
      averageSalary: 34900000,
      percentage: 15,
    },
  },
};
