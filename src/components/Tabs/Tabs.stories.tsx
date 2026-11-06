import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { defaultValue: 'account', children: null },
  render: (args) => (
    <Tabs {...args}>
      <Tabs.List aria-label="Settings">
        <Tabs.Trigger value="account">Account</Tabs.Trigger>
        <Tabs.Trigger value="billing">Billing</Tabs.Trigger>
        <Tabs.Trigger value="team" disabled>Team</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Panel value="account">Manage your account details.</Tabs.Panel>
      <Tabs.Panel value="billing">Update your payment method.</Tabs.Panel>
      <Tabs.Panel value="team">Invite teammates.</Tabs.Panel>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('tab', { name: 'Billing' }));
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent('Update your payment method.');
  },
};
