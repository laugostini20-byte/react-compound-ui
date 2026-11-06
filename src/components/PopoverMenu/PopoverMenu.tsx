import {
  createContext,
  useContext,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cx } from '../../utils/cx';
import { focusSibling, useClickOutside, useEscapeKey } from '../../utils/hooks';
import './PopoverMenu.css';

interface MenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}
const MenuContext = createContext<MenuContextValue | null>(null);

function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('PopoverMenu parts must be rendered inside <PopoverMenu>');
  return ctx;
}

function PopoverMenuRoot({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useClickOutside([rootRef], () => setOpen(false), open);
  useEscapeKey(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, open);
  return (
    <MenuContext.Provider value={{ open, setOpen, id, triggerRef }}>
      <div ref={rootRef} className={cx('rcu-popover-menu', className)} {...props} />
    </MenuContext.Provider>
  );
}

function PopoverMenuTrigger({ className, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen, id, triggerRef } = useMenu();
  return (
    <button
      ref={triggerRef}
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? id : undefined}
      className={cx('rcu-popover-menu__trigger', className)}
      onClick={(event) => {
        onClick?.(event);
        setOpen(!open);
      }}
      {...props}
    />
  );
}

export interface PopoverMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'end';
}

function PopoverMenuContent({ align = 'start', className, ...props }: PopoverMenuContentProps) {
  const { open, id } = useMenu();
  if (!open) return null;
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, 1 | -1 | 'first' | 'last'> = { ArrowDown: 1, ArrowUp: -1, Home: 'first', End: 'last' };
    const dir = map[event.key];
    if (dir === undefined) return;
    event.preventDefault();
    focusSibling(event.currentTarget, '[role="menuitem"]', dir);
  };
  return (
    <div
      id={id}
      role="menu"
      className={cx('rcu-menu', 'rcu-popover-menu__content', `rcu-popover-menu__content--${align}`, className)}
      onKeyDown={onKeyDown}
      ref={(node) => {
        node?.querySelector<HTMLElement>('[role="menuitem"]:not(:disabled)')?.focus();
      }}
      {...props}
    />
  );
}

export interface PopoverMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Called when the item is chosen; the menu closes afterwards. */
  onSelect?: () => void;
  danger?: boolean;
}

function PopoverMenuItem({ onSelect, danger, className, ...props }: PopoverMenuItemProps) {
  const { setOpen, triggerRef } = useMenu();
  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      className={cx('rcu-menu__item', danger && 'rcu-menu__item--danger', className)}
      onClick={() => {
        onSelect?.();
        setOpen(false);
        triggerRef.current?.focus();
      }}
      {...props}
    />
  );
}

function PopoverMenuSeparator() {
  return <div role="separator" className="rcu-menu__separator" />;
}

/** Compound menu: `<PopoverMenu>` → `<PopoverMenu.Trigger>` + `<PopoverMenu.Content>` of `<PopoverMenu.Item>`s. */
export const PopoverMenu = Object.assign(PopoverMenuRoot, {
  Trigger: PopoverMenuTrigger,
  Content: PopoverMenuContent,
  Item: PopoverMenuItem,
  Separator: PopoverMenuSeparator,
});
