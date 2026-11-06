import type { Meta, StoryObj } from '@storybook/react-vite';
import { HelpButton } from './HelpButton';

const meta = {
  title: 'Components/HelpButton',
  component: HelpButton,
  tags: ['autodocs'],
  args: { children: 'Your API key is shown once. Store it somewhere safe.' },
  decorators: [(Story) => <div style={{ minHeight: 140, fontFamily: 'var(--rcu-font)' }}>API key <Story /></div>],
} satisfies Meta<typeof HelpButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithTitle: Story = { args: { title: 'About API keys' } };
