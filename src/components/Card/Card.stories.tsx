import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [(Story) => <div style={{ maxWidth: 380 }}><Story /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <Card.Header>
        <Card.Title>Project settings</Card.Title>
      </Card.Header>
      <Card.Body>
        Cards are compound components, so you pick which parts to render and in what order.
      </Card.Body>
      <Card.Footer>
        <Button variant="secondary">Cancel</Button>
        <Button>Save</Button>
      </Card.Footer>
    </Card>
  ),
};

export const BodyOnly: Story = {
  render: () => (
    <Card>
      <Card.Body>A minimal card with just a body.</Card.Body>
    </Card>
  ),
};
