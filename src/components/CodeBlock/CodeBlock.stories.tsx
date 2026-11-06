import type { Meta, StoryObj } from '@storybook/react-vite';
import { CodeBlock } from './CodeBlock';

const sample = `import { Button } from '@laugostini20-byte/react-compound-ui';

export function SaveButton() {
  return <Button onClick={save}>Save</Button>;
}
`;

const meta = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  tags: ['autodocs'],
  args: { code: sample, language: 'tsx' },
} satisfies Meta<typeof CodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithFilenameAndLines: Story = { args: { filename: 'SaveButton.tsx', showLineNumbers: true } };
export const Plain: Story = { args: { language: undefined, copyable: false, code: 'npm install @laugostini20-byte/react-compound-ui' } };
