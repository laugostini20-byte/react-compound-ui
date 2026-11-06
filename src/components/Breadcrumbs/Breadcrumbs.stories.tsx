import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './Breadcrumbs';

const meta = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
  args: {
    children: [
      <Breadcrumbs.Link key="home" href="#">Home</Breadcrumbs.Link>,
      <Breadcrumbs.Link key="projects" href="#">Projects</Breadcrumbs.Link>,
      <Breadcrumbs.Link key="current" current>Settings</Breadcrumbs.Link>,
    ],
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomSeparator: Story = { args: { separator: '›' } };
