import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ContextMenu } from './ContextMenu';

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  args: { children: null },
  render: () => (
    <ContextMenu>
      <ContextMenu.Target
        style={{
          display: 'grid',
          placeItems: 'center',
          height: 180,
          border: '2px dashed var(--rcu-color-border)',
          color: 'var(--rcu-color-text-muted)',
          fontFamily: 'var(--rcu-font)',
        }}
      >
        Right-click anywhere in this box
      </ContextMenu.Target>
      <ContextMenu.Content>
        <ContextMenu.Item onSelect={fn()}>Open</ContextMenu.Item>
        <ContextMenu.Item onSelect={fn()}>Rename</ContextMenu.Item>
        <ContextMenu.Item onSelect={fn()}>Copy link</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item danger onSelect={fn()}>Move to trash</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu>
  ),
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
