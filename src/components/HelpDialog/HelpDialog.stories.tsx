import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { HelpDialog, type HelpTopic } from './HelpDialog';

const topics: HelpTopic[] = [
  { id: 'reset', question: 'How do I reset my password?', answer: 'Use “Forgot password” on the sign-in page.' },
  { id: 'invite', question: 'How do I invite a teammate?', answer: 'Open Settings → Members and choose Invite.' },
  { id: 'export', question: 'Can I export my data?', answer: 'Yes. Settings → Data → Export creates a CSV.' },
];

function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Help</Button>
      <HelpDialog open={open} onOpenChange={setOpen} topics={topics} footer="Still stuck? Email support@example.com" />
    </>
  );
}

const meta = { title: 'Components/HelpDialog', component: Demo, tags: ['autodocs'] } satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
