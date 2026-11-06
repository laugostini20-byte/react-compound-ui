import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: { content: 'Saves a copy to your drafts', children: <Button variant="secondary">Save draft</Button> },
  argTypes: { side: { control: 'inline-radio', options: ['top', 'bottom', 'left', 'right'] } },
  decorators: [(Story) => <div style={{ padding: 60, display: 'flex', justifyContent: 'center' }}><Story /></div>],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Top: Story = {};
export const Bottom: Story = { args: { side: 'bottom' } };
export const Right: Story = { args: { side: 'right' } };
