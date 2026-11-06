import { useId, useRef, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useClickOutside, useEscapeKey } from '../../utils/hooks';
import './HelpButton.css';

export interface HelpButtonProps {
  /** Help text shown when the button is pressed. */
  children: ReactNode;
  /** Accessible name for the button. */
  label?: string;
  /** Optional heading in the help bubble. */
  title?: ReactNode;
  className?: string;
}

/** A small "?" button that toggles a bubble of help text next to a field or heading. */
export function HelpButton({ children, label = 'More information', title, className }: HelpButtonProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootRef = useRef<HTMLSpanElement>(null);
  useClickOutside([rootRef], () => setOpen(false), open);
  useEscapeKey(() => setOpen(false), open);
  return (
    <span ref={rootRef} className={cx('rcu-help-button', className)}>
      <button
        type="button"
        className="rcu-help-button__trigger"
        aria-label={label}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        ?
      </button>
      <span id={id} role="region" aria-label={label} className="rcu-help-button__bubble" hidden={!open}>
        {title && <strong className="rcu-help-button__title">{title}</strong>}
        {children}
      </span>
    </span>
  );
}
