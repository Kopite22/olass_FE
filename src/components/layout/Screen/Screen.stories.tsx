import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Screen } from '@/components/layout/Screen';

const DEVICE_PRESETS = [
  { label: 'iPhone X (375x635)', width: 375, height: 635 },
  { label: 'iPhone SE (320x568)', width: 320, height: 568 },
  { label: 'iPhone 14 Pro Max (430x932)', width: 430, height: 932 },
  { label: 'Galaxy S20 (412x915)', width: 412, height: 915 },
];

const ScreenDemo = ({
  device,
}: {
  device: { width: number; height: number; label: string };
}) => (
  <div className='space-y-8 bg-white p-8 min-h-screen'>
    <div className='space-y-2'>
      <h2 className='text-title-2 text-neutral-900'>모바일 스크린</h2>
      <div className='text-body-1 text-neutral-900'>
        {device.label} 디바이스 기준
        <br />
        최대 너비 375px, 높이 100dvh
      </div>
    </div>
    <div className='flex justify-center items-start'>
      <div
        className='relative border border-neutral-200 rounded-2xl shadow-md overflow-hidden'
        style={{ width: device.width }}
      >
        <Screen className='bg-neutral-50'>
          <div className='p-4 text-neutral-900'>
            <h3 className='text-heading-1 mb-2'>Screen 컴포넌트</h3>
            <p className='text-body-1'>
              모바일 디바이스를 위한 컴포넌트로, 너비를 제한하고 가운데 정렬합니다.
            </p>
            <div className='h-[200px] bg-primary-100 mt-4 flex items-center justify-center rounded-lg'>
              컨텐츠 영역
            </div>
          </div>
        </Screen>
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
      <ScreenDemo device={device} />
    </div>
  );
};

const meta: Meta<typeof WithDeviceSelector> = {
  title: 'Design System/Layout/Screen',
  component: WithDeviceSelector,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Default: StoryObj = {
  render: () => <WithDeviceSelector />,
}; 