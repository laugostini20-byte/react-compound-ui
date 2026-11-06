import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Navbar.css';

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  /** Stick to the top of the viewport while scrolling. */
  sticky?: boolean;
}

function NavbarRoot({ sticky = false, className, children, ...props }: NavbarProps) {
  return (
    <header className={cx('rcu-navbar', sticky && 'rcu-navbar--sticky', className)} {...props}>
      <div className="rcu-navbar__inner">{children}</div>
    </header>
  );
}

function NavbarBrand({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cx('rcu-navbar__brand', className)} {...props} />;
}

function NavbarLinks({ className, children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <nav aria-label="Main" className={cx('rcu-navbar__links', className)} {...props}>
      {children}
    </nav>
  );
}

export interface NavbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks the link for the current page. */
  active?: boolean;
}

function NavbarLink({ active, className, ...props }: NavbarLinkProps) {
  return <a aria-current={active ? 'page' : undefined} className={cx('rcu-navbar__link', className)} {...props} />;
}

function NavbarActions({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('rcu-navbar__actions', className)} {...props} />;
}

/**
 * Compound top bar: `<Navbar>` → `<Navbar.Brand>`, `<Navbar.Links>` of `<Navbar.Link>`s, `<Navbar.Actions>`.
 * Links hide below 768px; put a `<NavMobileMenu>` in `<Navbar.Actions>` for small screens.
 */
export const Navbar = Object.assign(NavbarRoot, {
  Brand: NavbarBrand,
  Links: NavbarLinks,
  Link: NavbarLink,
  Actions: NavbarActions,
});
