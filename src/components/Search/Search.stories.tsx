import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Search } from './Search';

const meta = {
  title: 'Components/Search',
  component: Search,
  tags: ['autodocs'],
  args: { onSearch: fn(), placeholder: 'Search projects' },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = { args: { defaultValue: 'design system' } };
