import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useClickOutside, useControllableState } from '../../utils/hooks';
import './Dropdown.css';

export interface DropdownOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string | null) => void;
  label?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

/** A styled single-select list (listbox pattern) for when a native `<select>` won't do. */
export function Dropdown({
  options,
  value,
  defaultValue = null,
  onValueChange,
  label,
  placeholder = 'Select…',
  disabled = false,
  className,
}: DropdownProps) {
  const [selected, setSelected] = useControllableState<string | null>(value, defaultValue, onValueChange);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useClickOutside([rootRef], () => setOpen(false), open);

  const enabled = options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0);
  const current = options.find((o) => o.value === selected);

  const openList = () => {
    const index = options.findIndex((o) => o.value === selected);
    setActive(index >= 0 ? index : (enabled[0] ?? 0));
    setOpen(true);
  };
  const choose = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    setSelected(option.value);
    setOpen(false);
    buttonRef.current?.focus();
  };
  const move = (step: 1 | -1) => {
    const pos = enabled.indexOf(active);
    setActive(enabled[(pos + step + enabled.length) % enabled.length] ?? active);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
        event.preventDefault();
        openList();
      }
      return;
    }
    if (event.key === 'ArrowDown') { event.preventDefault(); move(1); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); move(-1); }
    else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); choose(active); }
    else if (event.key === 'Escape' || event.key === 'Tab') setOpen(false);
  };

  return (
    <div ref={rootRef} className={cx('rcu-field', 'rcu-dropdown', className)}>
      {label && <span id={`${id}-label`} className="rcu-field__label">{label}</span>}
      <button
        ref={buttonRef}
        type="button"
        className="rcu-control rcu-dropdown__button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-labelledby={label ? `${id}-label ${id}-value` : undefined}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
      >
        <span id={`${id}-value`} className={cx(!current && 'rcu-dropdown__placeholder')}>
          {current ? current.label : placeholder}
        </span>
        <span aria-hidden="true" className="rcu-dropdown__chevron">▾</span>
      </button>
      {open && (
        <ul id={`${id}-list`} role="listbox" aria-labelledby={label ? `${id}-label` : undefined} className="rcu-menu rcu-dropdown__list">
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-opt-${index}`}
              role="option"
              aria-selected={option.value === selected}
              aria-disabled={option.disabled || undefined}
              data-active={index === active}
              className="rcu-menu__item"
              onPointerEnter={() => !option.disabled && setActive(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => choose(index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
