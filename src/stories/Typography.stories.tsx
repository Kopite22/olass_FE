import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { cn } from '@/lib/utils';

const fontSamples = [
  { name: 'Title 1', className: 'text-title-1', sample: '올라스 Title 1' },
  { name: 'Title 2', className: 'text-title-2', sample: '올라스 Title 2' },
  { name: 'Title 3', className: 'text-title-3', sample: '올라스 Title 3' },
  {
    name: 'Heading 1',
    className: 'text-heading-1',
    sample: '올라스 Heading 1',
  },
  {
    name: 'Heading 2',
    className: 'text-heading-2',
    sample: '올라스 Heading 2',
  },
  {
    name: 'Headline 1',
    className: 'text-headline-1',
    sample: '올라스 Headline 1',
  },
  {
    name: 'Headline 2',
    className: 'text-headline-2',
    sample: '올라스 Headline 2',
  },
  { name: 'Body 1', className: 'text-body-1', sample: '올라스 Body 1' },
  { name: 'Body 2', className: 'text-body-2', sample: '올라스 Body 2' },
  { name: 'Label 1', className: 'text-label-1', sample: '올라스 Label 1' },
  { name: 'Label 2', className: 'text-label-2', sample: '올라스 Label 2' },
  {
    name: 'Caption 1',
    className: 'text-caption-1',
    sample: '올라스 Caption 1',
  },
  {
    name: 'Caption 2',
    className: 'text-caption-2',
    sample: '올라스 Caption 2',
  },
];

const TypographyDemo = () => (
  <div className='space-y-6 bg-white p-8'>
    {fontSamples.map(({ name, className, sample }) => (
      <div key={name} className='flex items-end gap-6'>
        <div className='w-32 text-gray-500 text-sm font-mono'>{name}</div>
        <div className={cn(className)}>{sample}</div>
      </div>
    ))}
  </div>
);

const meta: Meta<typeof TypographyDemo> = {
  title: 'Design System/Foundation/Typography',
  component: TypographyDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const All: StoryObj = {
  render: () => <TypographyDemo />,
};
