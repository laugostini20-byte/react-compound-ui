import { useEffect, useRef, useState, type InputHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { useLatest } from '../../utils/hooks';
import './Search.css';

export interface SearchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  value?: string;
  defaultValue?: string;
  /** Called on every keystroke. */
  onValueChange?: (value: string) => void;
  /** Called after typing pauses for `debounceMs`, or immediately on Enter. */
  onSearch?: (query: string) => void;
  debounceMs?: number;
  /** Accessible name (there is no visible label). */
  label?: string;
}

/** Search field with a magnifier icon, a clear button and a debounced `onSearch`. */
export function Search({
  value,
  defaultValue = '',
  onValueChange,
  onSearch,
  debounceMs = 300,
  label = 'Search',
  placeholder = 'Search…',
  className,
  ...props
}: SearchProps) {
  const [internal, setInternal] = useState(defaultValue);
  const query = value ?? internal;
  const inputRef = useRef<HTMLInputElement>(null);
  const onSearchRef = useLatest(onSearch);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const timer = setTimeout(() => onSearchRef.current?.(query), debounceMs);
    return () => clearTimeout(timer);
  }, [query, debounceMs, onSearchRef]);

  const update = (next: string) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <div role="search" className={cx('rcu-control', 'rcu-search', className)}>
      <span className="rcu-search__icon" aria-hidden="true">⌕</span>
      <input
        ref={inputRef}
        type="search"
        aria-label={label}
        className="rcu-search__input"
        placeholder={placeholder}
        value={query}
        onChange={(event) => update(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') onSearch?.(query);
          if (event.key === 'Escape') update('');
        }}
        {...props}
      />
      {query && (
        <button
          type="button"
          className="rcu-icon-button rcu-search__clear"
          aria-label="Clear search"
          onClick={() => {
            update('');
            inputRef.current?.focus();
          }}
        >
          ×
        </button>
      )}
    </div>
  );
}
