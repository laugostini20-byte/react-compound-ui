import { createContext, useContext, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useControllableState } from '../../utils/hooks';
import './Sidebar.css';

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}
const SidebarContext = createContext<SidebarContextValue>({ collapsed: false, setCollapsed: () => {} });

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** Icon-only mode (controlled). */
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Accessible name of the navigation landmark. */
  label?: string;
}

function SidebarRoot({ collapsed, defaultCollapsed = false, onCollapsedChange, label = 'Sidebar', className, ...props }: SidebarProps) {
  const [isCollapsed, setCollapsed] = useControllableState(collapsed, defaultCollapsed, onCollapsedChange);
  return (
    <SidebarContext.Provider value={{ collapsed: isCollapsed, setCollapsed }}>
      <nav aria-label={label} data-collapsed={isCollapsed} className={cx('rcu-sidebar', className)} {...props} />
    </SidebarContext.Provider>
  );
}

function SidebarHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('rcu-sidebar__header', className)} {...props} />;
}

export interface SidebarSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
}

function SidebarSection({ title, className, children, ...props }: SidebarSectionProps) {
  return (
    <div className={cx('rcu-sidebar__section', className)} {...props}>
      {title && <div className="rcu-sidebar__section-title">{title}</div>}
      <ul className="rcu-sidebar__list">{children}</ul>
    </div>
  );
}

export interface SidebarItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Icon shown always; the label hides when collapsed. */
  icon?: ReactNode;
  active?: boolean;
  /** Small count or badge on the right. */
  badge?: ReactNode;
  children: ReactNode;
}

function SidebarItem({ icon, active, badge, className, children, ...props }: SidebarItemProps) {
  const { collapsed } = useContext(SidebarContext);
  return (
    <li>
      <a
        aria-current={active ? 'page' : undefined}
        title={collapsed && typeof children === 'string' ? children : undefined}
        className={cx('rcu-sidebar__item', className)}
        {...props}
      >
        {icon && <span className="rcu-sidebar__icon" aria-hidden="true">{icon}</span>}
        <span className="rcu-sidebar__label">{children}</span>
        {badge !== undefined && <span className="rcu-sidebar__badge">{badge}</span>}
      </a>
    </li>
  );
}

function SidebarFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('rcu-sidebar__footer', className)} {...props} />;
}

/** Button that collapses / expands the sidebar. */
function SidebarToggle({ className }: { className?: string }) {
  const { collapsed, setCollapsed } = useContext(SidebarContext);
  return (
    <button
      type="button"
      className={cx('rcu-icon-button', 'rcu-sidebar__toggle', className)}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      aria-expanded={!collapsed}
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed ? '»' : '«'}
    </button>
  );
}

/** Compound side navigation: `<Sidebar>` → `<Sidebar.Header>`, `<Sidebar.Section>` of `<Sidebar.Item>`s, `<Sidebar.Footer>`. */
export const Sidebar = Object.assign(SidebarRoot, {
  Header: SidebarHeader,
  Section: SidebarSection,
  Item: SidebarItem,
  Footer: SidebarFooter,
  Toggle: SidebarToggle,
});
