import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { ToastProvider, useToast } from './Toast';

function Buttons() {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <Button onClick={() => toast.show({ title: 'Changes saved', tone: 'success' })}>Success</Button>
      <Button variant="secondary" onClick={() => toast.show({ title: 'New version available', description: 'Refresh to update.', tone: 'info' })}>Info</Button>
      <Button variant="secondary" onClick={() => toast.show({ title: 'Storage almost full', tone: 'warning' })}>Warning</Button>
      <Button variant="danger" onClick={() => toast.show({ title: 'Upload failed', description: 'Check your connection.', tone: 'danger', duration: 0 })}>Error (sticky)</Button>
    </div>
  );
}

function Demo() {
  return (
    <ToastProvider>
      <Buttons />
    </ToastProvider>
  );
}

const meta = { title: 'Components/Toast', component: Demo, tags: ['autodocs'] } satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
