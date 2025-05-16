import type { Meta, StoryObj } from '@storybook/react';
import { Plus } from 'lucide-react';

import { Button } from './Button';

const meta = {
  title: 'Design System/UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: '버튼',
  },
  argTypes: {
    variant: {
      options: ['solid', 'outlined', 'text'],
      control: { type: 'radio' },
    },
    color: {
      options: ['primary', 'assistive', 'dark'],
      control: { type: 'radio' },
    },
    size: {
      options: ['large', 'medium', 'small', 'fullWidth'],
      control: { type: 'radio' },
    },
    isFullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    leftIcon: {
      control: 'boolean',
    },
    rightIcon: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
} as Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Solid: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Button variant='solid' color='primary'>
        Primary
      </Button>
      <Button variant='solid' color='assistive'>
        Assistive
      </Button>
      <Button variant='solid' color='dark'>
        Dark
      </Button>
    </div>
  ),
};

export const Outlined: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Button variant='outlined' color='primary'>
        Primary
      </Button>
      <Button variant='outlined' color='assistive'>
        Assistive
      </Button>
    </div>
  ),
};

export const Text: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Button variant='text' color='primary'>
        Primary
      </Button>
      <Button variant='text' color='assistive'>
        Assistive
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-4'>
        <Button size='large'>Large</Button>
        <Button size='medium'>Medium</Button>
        <Button size='small' variant='text'>
          Small
        </Button>
      </div>
      <div className='w-full'>
        <Button size='fullWidth'>Full Width</Button>
      </div>
      <div className='w-full'>
        <Button isFullWidth>Is Full Width</Button>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-4'>
        <Button leftIcon={<Plus className='h-5 w-5' />}>Left Icon</Button>
        <Button rightIcon={<Plus className='h-5 w-5' />}>Right Icon</Button>
        <Button
          leftIcon={<Plus className='h-5 w-5' />}
          rightIcon={<Plus className='h-5 w-5' />}
        >
          Both Icons
        </Button>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-4'>
        <Button disabled variant='solid'>
          Solid
        </Button>
        <Button disabled variant='outlined'>
          Outlined
        </Button>
        <Button disabled variant='text'>
          Text
        </Button>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Solid Buttons
        </h3>
        <div className='flex gap-4'>
          <Button variant='solid' color='primary'>
            Primary
          </Button>
          <Button variant='solid' color='assistive'>
            Assistive
          </Button>
          <Button variant='solid' color='dark'>
            Dark
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Outlined Buttons
        </h3>
        <div className='flex gap-4'>
          <Button variant='outlined' color='primary'>
            Primary
          </Button>
          <Button variant='outlined' color='assistive'>
            Assistive
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Text Buttons
        </h3>
        <div className='flex gap-4'>
          <Button variant='text' color='primary'>
            Primary
          </Button>
          <Button variant='text' color='assistive'>
            Assistive
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>Sizes</h3>
        <div className='flex items-center gap-4'>
          <Button size='large'>Large</Button>
          <Button size='medium'>Medium</Button>
          <Button size='small' variant='text'>
            Small
          </Button>
        </div>
        <div className='w-full'>
          <Button size='fullWidth'>Full Width Size</Button>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Full Width Property
        </h3>
        <div className='w-full'>
          <Button isFullWidth>Full Width</Button>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          With Icons
        </h3>
        <div className='flex items-center gap-4'>
          <Button leftIcon={<Plus className='h-5 w-5' />}>Left Icon</Button>
          <Button rightIcon={<Plus className='h-5 w-5' />}>Right Icon</Button>
          <Button
            leftIcon={<Plus className='h-5 w-5' />}
            rightIcon={<Plus className='h-5 w-5' />}
          >
            Both Icons
          </Button>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h3 className='text-heading-1 font-semibold text-neutral-500'>
          Disabled
        </h3>
        <div className='flex gap-4'>
          <Button disabled variant='solid'>
            Solid
          </Button>
          <Button disabled variant='outlined'>
            Outlined
          </Button>
          <Button disabled variant='text'>
            Text
          </Button>
        </div>
      </div>
    </div>
  ),
};
