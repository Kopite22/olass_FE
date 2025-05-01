import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import Grid from '@/components/layout/Grid/Grid';

const DEVICE_PRESETS = [
  { label: 'iPhone X (375x635)', width: 375, height: 635 },
  { label: 'iPhone SE (320x568)', width: 320, height: 568 },
  { label: 'iPhone 14 Pro Max (430x932)', width: 430, height: 932 },
  { label: 'Galaxy S20 (412x915)', width: 412, height: 915 },
  { label: 'iPad Mini (768x1024)', width: 768, height: 1024 },
];

const GridDemo = ({
  device,
}: {
  device: { width: number; height: number; label: string };
}) => (
  <div className='space-y-8 bg-white p-8 min-h-screen'>
    <div className='space-y-2'>
      <h2 className='text-title-2 text-neutral-900'>Grid System</h2>
      <div className='text-body-1 text-neutral-900'>
        {device.label} 기준
        <br />
        Margin 20px, Gutter 16px, Columns 4
      </div>
    </div>
    <div className='flex justify-center items-start'>
      <div
        className='relative bg-primary-50 border border-neutral-200 rounded-2xl shadow-md overflow-hidden'
        style={{ width: device.width, height: device.height }}
      >
        <Grid className='h-full'>
          {[1, 2, 3, 4].map((col) => (
            <div
              key={col}
              className={`h-full ${
                col % 2 === 0 ? 'bg-primary-100/40' : 'bg-primary-200/30'
              } border border-primary-200`}
            />
          ))}
        </Grid>
      </div>
    </div>
  </div>
);

const WithDeviceSelector = () => {
  const [selected, setSelected] = useState(0);
  const device = {
    ...DEVICE_PRESETS[selected],
    label: DEVICE_PRESETS[selected].label,
  };
  return (
    <div>
      <div className='mb-4 flex gap-2'>
        {DEVICE_PRESETS.map((d, i) => (
          <button
            key={d.label}
            className={`px-3 py-1 rounded border text-sm font-medium transition-colors ${
              i === selected
                ? 'bg-primary-100 border-primary-500 text-primary-900'
                : 'bg-neutral-0 border-neutral-200 text-neutral-700 hover:bg-neutral-50'
            }`}
            onClick={() => setSelected(i)}
          >
            {d.label}
          </button>
        ))}
      </div>
      <GridDemo device={device} />
    </div>
  );
};

const meta: Meta<typeof WithDeviceSelector> = {
  title: 'Design System/Foundation/Grid',
  component: WithDeviceSelector,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const All: StoryObj = {
  render: () => <WithDeviceSelector />,
};
