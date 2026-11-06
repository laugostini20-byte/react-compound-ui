import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: { children: null },
  render: (args) => (
    <Accordion {...args} style={{ maxWidth: 480 }}>
      <Accordion.Item value="shipping">
        <Accordion.Trigger>How long does shipping take?</Accordion.Trigger>
        <Accordion.Content>Most orders arrive in 3–5 business days.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="returns">
        <Accordion.Trigger>Can I return an item?</Accordion.Trigger>
        <Accordion.Content>Yes, within 30 days of delivery.</Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="support">
        <Accordion.Trigger>How do I contact support?</Accordion.Trigger>
        <Accordion.Content>Use the help button in the top bar.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = { args: { defaultValue: ['shipping'] } };
export const Multiple: Story = { args: { multiple: true, defaultValue: ['shipping', 'returns'] } };
