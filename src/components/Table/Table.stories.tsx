import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Badge } from '../Badge';
import { Table, type SortDirection } from './Table';

const rows = [
  { name: 'Aurora', owner: 'Priya', status: 'Active', tasks: 42 },
  { name: 'Beacon', owner: 'Marco', status: 'Paused', tasks: 7 },
  { name: 'Cobalt', owner: 'Jin', status: 'Active', tasks: 19 },
  { name: 'Delta', owner: 'Sam', status: 'Done', tasks: 63 },
];

function Demo({ striped, dense }: { striped?: boolean; dense?: boolean }) {
  const [dir, setDir] = useState<SortDirection>('none');
  const sorted = dir === 'none' ? rows : [...rows].sort((a, b) => (dir === 'ascending' ? a.tasks - b.tasks : b.tasks - a.tasks));
  return (
    <Table caption="Projects" striped={striped} dense={dense}>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Project</Table.HeaderCell>
          <Table.HeaderCell>Owner</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell
            align="right"
            sort={dir}
            onSort={() => setDir(dir === 'ascending' ? 'descending' : 'ascending')}
          >
            Tasks
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {sorted.map((r) => (
          <Table.Row key={r.name}>
            <Table.Cell>{r.name}</Table.Cell>
            <Table.Cell>{r.owner}</Table.Cell>
            <Table.Cell>
              <Badge tone={r.status === 'Active' ? 'success' : r.status === 'Paused' ? 'warning' : 'neutral'}>{r.status}</Badge>
            </Table.Cell>
            <Table.Cell align="right">{r.tasks}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}

const meta = { title: 'Components/Table', component: Demo, tags: ['autodocs'] } satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const StripedDense: Story = { args: { striped: true, dense: true } };
