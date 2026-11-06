import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavMobileMenu } from './NavMobileMenu';

const meta = {
  title: 'Components/NavMobileMenu',
  component: NavMobileMenu,
  tags: ['autodocs'],
  args: {
    title: 'Compound',
    alwaysVisible: true,
    children: [
      <NavMobileMenu.Link key="1" href="#" active>Dashboard</NavMobileMenu.Link>,
      <NavMobileMenu.Link key="2" href="#">Projects</NavMobileMenu.Link>,
      <NavMobileMenu.Link key="3" href="#">Reports</NavMobileMenu.Link>,
      <NavMobileMenu.Link key="4" href="#">Settings</NavMobileMenu.Link>,
    ],
  },
} satisfies Meta<typeof NavMobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
