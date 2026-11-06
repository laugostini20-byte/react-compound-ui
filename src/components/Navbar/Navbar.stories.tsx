import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button';
import { NavMobileMenu } from '../NavMobileMenu';
import { Navbar } from './Navbar';

function Demo() {
  return (
    <Navbar>
      <Navbar.Brand href="#">
        <img src="brand/mark.svg" alt="" width={28} height={28} />
        <img src="brand/logo.svg" alt="Compound" height={18} />
      </Navbar.Brand>
      <Navbar.Links>
        <Navbar.Link href="#" active>Dashboard</Navbar.Link>
        <Navbar.Link href="#">Projects</Navbar.Link>
        <Navbar.Link href="#">Reports</Navbar.Link>
      </Navbar.Links>
      <Navbar.Actions>
        <Button size="sm" variant="secondary">Sign in</Button>
        <NavMobileMenu title={<img src="brand/logo.svg" alt="Compound" height={16} />}>
          <NavMobileMenu.Link href="#" active>Dashboard</NavMobileMenu.Link>
          <NavMobileMenu.Link href="#">Projects</NavMobileMenu.Link>
          <NavMobileMenu.Link href="#">Reports</NavMobileMenu.Link>
        </NavMobileMenu>
      </Navbar.Actions>
    </Navbar>
  );
}

const meta = {
  title: 'Components/Navbar',
  component: Demo,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Mobile: Story = { globals: { viewport: { value: 'mobile1', isRotated: false } } };
