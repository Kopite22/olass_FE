import { Meta, StoryObj } from '@storybook/react';

import { LabeledSlider } from './LabeledSlider';

const meta: Meta<typeof LabeledSlider> = {
  title: 'Components/Common/LabeledSlider',
  component: LabeledSlider,
  tags: ['autodocs'],
  argTypes: {
    heading: { control: 'text' },
    startLabel: { control: 'text' },
    middleLabel: { control: 'text' },
    endLabel: { control: 'text' },
    showLabels: { control: 'boolean' },
    defaultValue: { control: 'object' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof LabeledSlider>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    heading: '볼륨 조절',
    startLabel: '음소거',
    endLabel: '최대 볼륨',
  },
};

export const WithMiddleLabel: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    heading: '볼륨 조절',
    startLabel: '음소거',
    middleLabel: '중간',
    endLabel: '최대 볼륨',
  },
};

export const NoHeading: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    startLabel: '낮음',
    endLabel: '높음',
  },
};

export const NoLabels: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    heading: '볼륨 조절',
    showLabels: false,
  },
};

export const Range: Story = {
  args: {
    defaultValue: [10000],
    min: 0,
    max: 1000000,
    step: 10000,
    heading: '가격 범위',
    startLabel: '0원',
    endLabel: '100,000원',
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: [50],
    min: 0,
    max: 100,
    step: 1,
    heading: '볼륨 조절',
    startLabel: '음소거',
    endLabel: '최대 볼륨',
    disabled: true,
  },
};
