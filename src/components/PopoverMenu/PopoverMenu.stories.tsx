import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { PopoverMenu } from './PopoverMenu';

const meta = {
  title: 'Components/PopoverMenu',
  component: PopoverMenu,
  tags: ['autodocs'],
  render: () => (
    <div style={{ minHeight: 220 }}>
      <PopoverMenu>
        <PopoverMenu.Trigger>Actions ▾</PopoverMenu.Trigger>
        <PopoverMenu.Content>
          <PopoverMenu.Item onSelect={fn()}>Edit</PopoverMenu.Item>
          <PopoverMenu.Item onSelect={fn()}>Duplicate</PopoverMenu.Item>
          <PopoverMenu.Item disabled>Share (coming soon)</PopoverMenu.Item>
          <PopoverMenu.Separator />
          <PopoverMenu.Item danger onSelect={fn()}>Delete</PopoverMenu.Item>
        </PopoverMenu.Content>
      </PopoverMenu>
    </div>
  ),
} satisfies Meta<typeof PopoverMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
