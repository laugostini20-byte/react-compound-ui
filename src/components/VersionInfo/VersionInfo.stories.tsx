import type { Meta, StoryObj } from '@storybook/react-vite';
import { VersionInfo } from './VersionInfo';

const meta = {
  title: 'Components/VersionInfo',
  component: VersionInfo,
  tags: ['autodocs'],
  args: { version: '1.4.2' },
} satisfies Meta<typeof VersionInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Production: Story = { args: { environment: 'production', changelogHref: '#' } };
export const Staging: Story = { args: { environment: 'staging', commit: '9f2c4e1a7b', builtAt: '2026-11-05T14:30:00Z' } };
