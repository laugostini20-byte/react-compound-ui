import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FileList } from './FileList';

const meta = {
  title: 'Components/FileList',
  component: FileList,
  tags: ['autodocs'],
  args: {
    onRemove: fn(),
    onRetry: fn(),
    files: [
      { id: '1', name: 'quarterly-report.pdf', size: 2_400_000, status: 'done' },
      { id: '2', name: 'team-photo.jpg', size: 5_800_000, status: 'uploading', progress: 62 },
      { id: '3', name: 'notes.txt', size: 1_200, status: 'queued' },
      { id: '4', name: 'huge-video.mov', size: 1_900_000_000, status: 'error', error: 'File is larger than 500 MB' },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof FileList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ReadOnly: Story = { args: { onRemove: undefined, onRetry: undefined } };
