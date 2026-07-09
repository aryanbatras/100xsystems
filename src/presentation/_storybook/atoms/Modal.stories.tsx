import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from '../../__components/atoms/Modal';
import { Button } from '../../__components/atoms/Button';

const meta = {
  title: 'Atoms/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Overlay modal dialog with header, body, and footer sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 'xl', 'full'],
    },
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    closeOnOverlay: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const onClose = () => {};

export const Default: Story = {
  args: {
    isOpen: true,
    onClose,
    title: 'Confirm Action',
    children: 'Are you sure you want to proceed with this action?',
    footer: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Confirm</Button>
      </>
    ),
  },
};

export const WithoutFooter: Story = {
  args: {
    isOpen: true,
    onClose,
    title: 'Information',
    children:
      'This is an informational modal without any footer actions. Click outside or press Escape to close.',
  },
};

export const WithoutTitle: Story = {
  args: {
    isOpen: true,
    onClose,
    children:
      'This modal has no title bar, just content and a default close button.',
    footer: <Button variant="primary">Got it</Button>,
  },
};

export const Small: Story = {
  args: {
    isOpen: true,
    onClose,
    size: 'sm',
    title: 'Quick Action',
    children: 'Small confirmation dialog.',
    footer: <Button variant="primary">OK</Button>,
  },
};

export const Large: Story = {
  args: {
    isOpen: true,
    onClose,
    size: 'lg',
    title: 'Large Modal',
    children: (
      <div className="space-y-4">
        <p>This is a large modal with more content.</p>
        <p>It demonstrates how the modal handles longer content gracefully.</p>
        <p>The max-height is constrained to 90vh with scrolling.</p>
      </div>
    ),
    footer: (
      <>
        <Button variant="secondary">Cancel</Button>
        <Button variant="primary">Save Changes</Button>
      </>
    ),
  },
};
