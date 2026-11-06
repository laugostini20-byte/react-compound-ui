import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { DatePicker } from './DatePicker';

const meta = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  args: { label: 'Start date', onValueChange: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 300, minHeight: 360 }}><Story /></div>],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: new Date(2026, 10, 14) } };
export const FutureOnly: Story = { args: { label: 'Delivery date', min: new Date() } };
