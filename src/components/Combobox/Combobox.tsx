import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useClickOutside } from '../../utils/hooks';
import './Combobox.css';

export interface ComboboxOption {
  value: string;
  label: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  /** Selected option value. */
  value?: string | null;
  onValueChange?: (value: string | null) => void;
  label?: ReactNode;
  placeholder?: string;
  /** Text shown when nothing matches. */
  emptyText?: ReactNode;
  disabled?: boolean;
  className?: string;
}

/** A text box that filters a list of options as you type (combobox pattern). */
export function Combobox({
  options,
  value = null,
  onValueChange,
  label,
  placeholder = 'Type to search…',
  emptyText = 'No matches',
  disabled = false,
  className,
}: ComboboxProps) {
  const selectedLabel = options.find((o) => o.value === value)?.label ?? '';
  const [query, setQuery] = useState(selectedLabel);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const closeAndReset = () => {
    setOpen(false);
    setQuery(selectedLabel);
  };
  useClickOutside([rootRef], closeAndReset, open);

  const q = query.trim().toLowerCase();
  const filtered = q && query !== selectedLabel ? options.filter((o) => o.label.toLowerCase().includes(q)) : options;

  const choose = (option: ComboboxOption) => {
    onValueChange?.(option.value);
    setQuery(option.label);
    setOpen(false);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) setOpen(true);
      else setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (event.key === 'Enter' && open && filtered[active]) {
      event.preventDefault();
      choose(filtered[active]);
    } else if (event.key === 'Escape') {
      closeAndReset();
    }
  };

  return (
    <div ref={rootRef} className={cx('rcu-field', 'rcu-combobox', className)}>
      {label && <label htmlFor={`${id}-input`} className="rcu-field__label">{label}</label>}
      <input
        id={`${id}-input`}
        role="combobox"
        className="rcu-control"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-autocomplete="list"
        aria-activedescendant={open && filtered[active] ? `${id}-opt-${active}` : undefined}
        autoComplete="off"
        placeholder={placeholder}
        disabled={disabled}
        value={query}
        onFocus={() => setOpen(true)}
        onChange={(event) => {
          setQuery(event.target.value);
          setActive(0);
          setOpen(true);
          if (event.target.value === '') onValueChange?.(null);
        }}
        onKeyDown={onKeyDown}
      />
      {open && (
        <ul id={`${id}-list`} role="listbox" className="rcu-menu rcu-combobox__list">
          {filtered.length === 0 && <li className="rcu-combobox__empty">{emptyText}</li>}
          {filtered.map((option, index) => (
            <li
              key={option.value}
              id={`${id}-opt-${index}`}
              role="option"
              aria-selected={option.value === value}
              data-active={index === active}
              className="rcu-menu__item"
              onPointerEnter={() => setActive(index)}
              onPointerDown={(event) => event.preventDefault()}
              onClick={() => choose(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
