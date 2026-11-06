import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from '../Button';
import { Dialog, type DialogSize } from './Dialog';

function DialogDemo({ size }: { size?: DialogSize }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onOpenChange={setOpen} size={size}>
        <Dialog.Header>
          <Dialog.Title>Archive project?</Dialog.Title>
          <Dialog.Description>You can restore it later from Settings.</Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>Archived projects are hidden from the dashboard and stop sending notifications.</Dialog.Body>
        <Dialog.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={() => setOpen(false)}>Archive</Button>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

const meta = {
  title: 'Components/Dialog',
  component: DialogDemo,
  tags: ['autodocs'],
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
} satisfies Meta<typeof DialogDemo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Large: Story = { args: { size: 'lg' } };
