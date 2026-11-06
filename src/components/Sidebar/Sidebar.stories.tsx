import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from './Sidebar';

function Demo({ defaultCollapsed }: { defaultCollapsed?: boolean }) {
  return (
    <div style={{ height: 460 }}>
      <Sidebar defaultCollapsed={defaultCollapsed}>
        <Sidebar.Header>
          <span>◆ Compound</span>
          <Sidebar.Toggle />
        </Sidebar.Header>
        <Sidebar.Section title="Workspace">
          <Sidebar.Item href="#" icon="⌂" active>Home</Sidebar.Item>
          <Sidebar.Item href="#" icon="▤">Projects</Sidebar.Item>
          <Sidebar.Item href="#" icon="✉" badge={3}>Inbox</Sidebar.Item>
        </Sidebar.Section>
        <Sidebar.Section title="Account">
          <Sidebar.Item href="#" icon="⚙">Settings</Sidebar.Item>
        </Sidebar.Section>
        <Sidebar.Footer>
          <Sidebar.Item href="#" icon="?">Help</Sidebar.Item>
        </Sidebar.Footer>
      </Sidebar>
    </div>
  );
}

const meta = {
  title: 'Components/Sidebar',
  component: Demo,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {};
export const Collapsed: Story = { args: { defaultCollapsed: true } };
