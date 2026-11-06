import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { label: 'Email', placeholder: 'you@example.com' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithHint: Story = { args: { hint: 'We never share your email.' } };
export const WithError: Story = { args: { defaultValue: 'not-an-email', error: 'Enter a valid email address.' } };
export const WithAffixes: Story = { args: { label: 'Price', placeholder: '0.00', prefix: '$', suffix: 'USD' } };
export const Disabled: Story = { args: { disabled: true } };
