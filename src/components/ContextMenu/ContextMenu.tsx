import {
  createContext,
  useContext,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cx } from '../../utils/cx';
import { focusSibling, useClickOutside, useEscapeKey } from '../../utils/hooks';
import './ContextMenu.css';

interface Point { x: number; y: number }
interface ContextMenuValue {
  position: Point | null;
  openAt: (point: Point) => void;
  close: () => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
}
const ContextMenuContext = createContext<ContextMenuValue | null>(null);

function useContextMenu() {
  const ctx = useContext(ContextMenuContext);
  if (!ctx) throw new Error('ContextMenu parts must be rendered inside <ContextMenu>');
  return ctx;
}

function ContextMenuRoot({ children }: { children: React.ReactNode }) {
  const [position, setPosition] = useState<Point | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const close = () => setPosition(null);
  useClickOutside([menuRef], close, position !== null);
  useEscapeKey(close, position !== null);
  return (
    <ContextMenuContext.Provider value={{ position, openAt: setPosition, close, menuRef }}>
      {children}
    </ContextMenuContext.Provider>
  );
}

/** The area that opens the menu on right-click (or Shift+F10 / the Menu key when focused). */
function ContextMenuTarget({ className, onContextMenu, onKeyDown, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { openAt } = useContextMenu();
  return (
    <div
      tabIndex={0}
      className={cx('rcu-context-menu__target', className)}
      onContextMenu={(event) => {
        onContextMenu?.(event);
        event.preventDefault();
        openAt({ x: event.clientX, y: event.clientY });
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) {
          event.preventDefault();
          const rect = event.currentTarget.getBoundingClientRect();
          openAt({ x: rect.left + 16, y: rect.top + 16 });
        }
      }}
      {...props}
    />
  );
}

function ContextMenuContent({ className, style, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { position, menuRef } = useContextMenu();
  if (!position) return null;
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const map: Record<string, 1 | -1 | 'first' | 'last'> = { ArrowDown: 1, ArrowUp: -1, Home: 'first', End: 'last' };
    const dir = map[event.key];
    if (dir === undefined) return;
    event.preventDefault();
    focusSibling(event.currentTarget, '[role="menuitem"]', dir);
  };
  return (
    <div
      ref={(node) => {
        menuRef.current = node;
        node?.querySelector<HTMLElement>('[role="menuitem"]:not(:disabled)')?.focus();
      }}
      role="menu"
      className={cx('rcu-menu', 'rcu-context-menu__content', className)}
      style={{ left: position.x, top: position.y, ...style }}
      onKeyDown={onKeyDown}
      {...props}
    />
  );
}

export interface ContextMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onSelect?: () => void;
  danger?: boolean;
}

function ContextMenuItem({ onSelect, danger, className, ...props }: ContextMenuItemProps) {
  const { close } = useContextMenu();
  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      className={cx('rcu-menu__item', danger && 'rcu-menu__item--danger', className)}
      onClick={() => {
        onSelect?.();
        close();
      }}
      {...props}
    />
  );
}

function ContextMenuSeparator() {
  return <div role="separator" className="rcu-menu__separator" />;
}

/** Compound right-click menu: `<ContextMenu>` → `<ContextMenu.Target>` + `<ContextMenu.Content>` of `<ContextMenu.Item>`s. */
export const ContextMenu = Object.assign(ContextMenuRoot, {
  Target: ContextMenuTarget,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  Separator: ContextMenuSeparator,
});
