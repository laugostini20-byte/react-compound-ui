import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { FileDropzone } from './FileDropzone';

const meta = {
  title: 'Components/FileDropzone',
  component: FileDropzone,
  tags: ['autodocs'],
  args: { onFiles: fn() },
  decorators: [(Story) => <div style={{ maxWidth: 480 }}><Story /></div>],
} satisfies Meta<typeof FileDropzone>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ImagesOnly: Story = { args: { accept: 'image/*', maxSize: 5 * 1024 * 1024 } };
export const Disabled: Story = { args: { disabled: true } };
