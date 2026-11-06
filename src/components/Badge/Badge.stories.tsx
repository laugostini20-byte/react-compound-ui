import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const tones = ['neutral', 'primary', 'accent', 'success', 'warning', 'danger', 'info'] as const;

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Badge' },
  argTypes: { tone: { control: 'select', options: tones } },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllTones: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {tones.map((tone) => (
        <Badge key={tone} {...args} tone={tone} dot>
          {tone}
        </Badge>
      ))}
    </div>
  ),
};
