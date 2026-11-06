import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  args: { label: 'Volume' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithUnit: Story = { args: { label: 'Opacity', defaultValue: 80, formatValue: (v) => `${v}%` } };
export const Stepped: Story = { args: { label: 'Rating', min: 1, max: 5, step: 1, defaultValue: 3 } };
export const Disabled: Story = { args: { disabled: true } };
