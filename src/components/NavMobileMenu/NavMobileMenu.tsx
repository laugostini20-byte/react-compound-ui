import { createContext, useContext, useEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './NavMobileMenu.css';

const CloseContext = createContext<() => void>(() => {});

export interface NavMobileMenuProps {
  /** Heading at the top of the drawer. */
  title?: ReactNode;
  /** Accessible name of the hamburger button. */
  label?: string;
  /** Show the hamburger at every width, not just below 768px. */
  alwaysVisible?: boolean;
  children: ReactNode;
  className?: string;
}

/** Hamburger button that opens a slide-in drawer of links. Hidden at 768px and wider by default. */
function NavMobileMenuRoot({ title, label = 'Open menu', alwaysVisible = false, children, className }: NavMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  const close = () => setOpen(false);
  return (
    <div className={cx('rcu-nav-mobile', alwaysVisible && 'rcu-nav-mobile--always', className)}>
      <button type="button" className="rcu-icon-button rcu-nav-mobile__toggle" aria-label={label} aria-expanded={open} onClick={() => setOpen(true)}>
        <span className="rcu-nav-mobile__bars" aria-hidden="true" />
      </button>
      <dialog
        ref={ref}
        aria-label={typeof title === 'string' ? title : 'Menu'}
        className="rcu-nav-mobile__drawer"
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => event.target === event.currentTarget && close()}
      >
        <div className="rcu-nav-mobile__panel">
          <div className="rcu-nav-mobile__header">
            <span className="rcu-nav-mobile__title">{title}</span>
            <button type="button" className="rcu-icon-button" aria-label="Close menu" onClick={close}>×</button>
          </div>
          <nav aria-label="Mobile">
            <CloseContext.Provider value={close}>
              <ul className="rcu-nav-mobile__list">{children}</ul>
            </CloseContext.Provider>
          </nav>
        </div>
      </dialog>
    </div>
  );
}

export interface NavMobileMenuLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
}

function NavMobileMenuLink({ active, className, onClick, ...props }: NavMobileMenuLinkProps) {
  const close = useContext(CloseContext);
  return (
    <li>
      <a
        aria-current={active ? 'page' : undefined}
        className={cx('rcu-nav-mobile__link', className)}
        onClick={(event) => {
          onClick?.(event);
          close();
        }}
        {...props}
      />
    </li>
  );
}

/** Compound mobile menu: `<NavMobileMenu>` containing `<NavMobileMenu.Link>`s. */
export const NavMobileMenu = Object.assign(NavMobileMenuRoot, { Link: NavMobileMenuLink });
