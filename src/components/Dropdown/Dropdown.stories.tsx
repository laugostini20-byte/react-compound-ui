import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Dropdown } from './Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  args: {
    label: 'Time zone',
    onValueChange: fn(),
    options: [
      { value: 'pst', label: 'Pacific (UTC−8)' },
      { value: 'mst', label: 'Mountain (UTC−7)' },
      { value: 'cst', label: 'Central (UTC−6)' },
      { value: 'est', label: 'Eastern (UTC−5)' },
      { value: 'utc', label: 'UTC', disabled: true },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: 320, minHeight: 280 }}><Story /></div>],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Preselected: Story = { args: { defaultValue: 'cst' } };
export const Disabled: Story = { args: { disabled: true } };
