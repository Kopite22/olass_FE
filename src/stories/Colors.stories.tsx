import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { cn } from '@/lib/utils';

const colorGroups = [
  {
    name: 'Primary',
    colors: [
      { name: '100', className: 'bg-primary-100 text-neutral-900' },
      { name: '200', className: 'bg-primary-200 text-neutral-900' },
      { name: '300', className: 'bg-primary-300 text-neutral-900' },
      { name: '400', className: 'bg-primary-400 text-neutral-900' },
      { name: '500', className: 'bg-primary-500 text-neutral-900' },
      { name: '600', className: 'bg-primary-600 text-neutral-0' },
      { name: '700', className: 'bg-primary-700 text-neutral-0' },
      { name: '800', className: 'bg-primary-800 text-neutral-0' },
      { name: '900', className: 'bg-primary-900 text-neutral-0' },
    ],
  },
  {
    name: 'Neutral',
    colors: [
      {
        name: '0',
        className: 'bg-neutral-0 text-neutral-900 border border-neutral-100',
      },
      { name: '25', className: 'bg-neutral-25 text-neutral-900' },
      { name: '50', className: 'bg-neutral-50 text-neutral-900' },
      { name: '100', className: 'bg-neutral-100 text-neutral-900' },
      { name: '200', className: 'bg-neutral-200 text-neutral-900' },
      { name: '300', className: 'bg-neutral-300 text-neutral-900' },
      { name: '400', className: 'bg-neutral-400 text-neutral-0' },
      { name: '500', className: 'bg-neutral-500 text-neutral-0' },
      { name: '600', className: 'bg-neutral-600 text-neutral-0' },
      { name: '700', className: 'bg-neutral-700 text-neutral-0' },
      { name: '800', className: 'bg-neutral-800 text-neutral-0' },
      { name: '900', className: 'bg-neutral-900 text-neutral-0' },
    ],
  },
  {
    name: 'Alert',
    colors: [{ name: 'DEFAULT', className: 'bg-alert text-neutral-0' }],
  },
];

const ColorDemo = () => (
  <div className='space-y-12 bg-white p-8'>
    {colorGroups.map((group) => (
      <div key={group.name} className='space-y-4'>
        <h2 className='text-title-2 text-neutral-900'>{group.name}</h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          {group.colors.map((color) => (
            <div key={color.name} className='space-y-2'>
              <div
                className={cn(
                  'h-24 rounded-lg flex items-center justify-center',
                  color.className
                )}
              >
                <span className='text-body-1 font-medium'>Aa</span>
              </div>
              <div className='text-center'>
                <div className='text-label-1 text-neutral-900'>
                  {color.name}
                </div>
                <div className='text-caption-1 text-neutral-500'>
                  {color.className
                    .split(' ')
                    .find((c) => c.startsWith('bg-'))
                    ?.replace('bg-', '')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const meta: Meta<typeof ColorDemo> = {
  title: 'Design System/Foundation/Colors',
  component: ColorDemo,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const All: StoryObj = {
  render: () => <ColorDemo />,
};
