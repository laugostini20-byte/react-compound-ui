import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { ErrorState } from './ErrorState';

const meta = { title: 'Components/ErrorState', component: ErrorState, tags: ['autodocs'] } satisfies Meta<typeof ErrorState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { actions: <Button>Try again</Button> } };
export const NotFound: Story = {
  args: {
    code: '404',
    title: 'Page not found',
    description: 'The page you are looking for was moved or never existed.',
    icon: '🧭',
    actions: (
      <>
        <Button variant="secondary">Go back</Button>
        <Button>Home</Button>
      </>
    ),
  },
};
