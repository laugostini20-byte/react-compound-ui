import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import { FileList, type FileListItem } from '../FileList';
import { FileUploadButton } from './FileUploadButton';

const meta = {
  title: 'Components/FileUploadButton',
  component: FileUploadButton,
  tags: ['autodocs'],
  args: { onFiles: fn() },
} satisfies Meta<typeof FileUploadButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', children: 'Attach' } };

function WithListDemo() {
  const [files, setFiles] = useState<FileListItem[]>([]);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 480 }}>
      <FileUploadButton
        multiple
        maxSize={10 * 1024 * 1024}
        onFiles={(accepted, rejected) =>
          setFiles((list) => [
            ...list,
            ...accepted.map((f) => ({ id: crypto.randomUUID(), name: f.name, size: f.size, status: 'done' as const })),
            ...rejected.map(({ file, reason }) => ({ id: crypto.randomUUID(), name: file.name, size: file.size, status: 'error' as const, error: reason })),
          ])
        }
      >
        Add files
      </FileUploadButton>
      <FileList files={files} onRemove={(id) => setFiles((list) => list.filter((f) => f.id !== id))} />
    </div>
  );
}

export const WithFileList: Story = { render: () => <WithListDemo /> };
