import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useClickOutside, useControllableState, useEscapeKey } from '../../utils/hooks';
import './DatePicker.css';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}
function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (date: Date | null) => void;
  label?: ReactNode;
  placeholder?: string;
  /** Earliest selectable day. */
  min?: Date;
  /** Latest selectable day. */
  max?: Date;
  /** Formats the selected date in the field. */
  formatDate?: (date: Date) => string;
  disabled?: boolean;
  className?: string;
}

/** A field that opens a month calendar. Arrow keys move by day/week, PageUp/PageDown by month. */
export function DatePicker({
  value,
  defaultValue = null,
  onValueChange,
  label,
  placeholder = 'Pick a date',
  min,
  max,
  formatDate = (d) => d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
  disabled = false,
  className,
}: DatePickerProps) {
  const [selected, setSelected] = useControllableState<Date | null>(value, defaultValue, onValueChange);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(() => startOfDay(selected ?? new Date()));
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const close = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };
  useClickOutside([rootRef], () => setOpen(false), open);
  useEscapeKey(close, open);

  const isDisabled = (day: Date) => (min && day < startOfDay(min)) || (max && day > startOfDay(max)) || false;

  const year = focused.getFullYear();
  const month = focused.getMonth();
  const first = new Date(year, month, 1);
  const days = Array.from({ length: 42 }, (_, i) => addDays(first, i - first.getDay()));
  const [today] = useState(() => startOfDay(new Date()));

  const choose = (day: Date) => {
    if (isDisabled(day)) return;
    setSelected(day);
    close();
  };

  const onGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, () => Date> = {
      ArrowLeft: () => addDays(focused, -1),
      ArrowRight: () => addDays(focused, 1),
      ArrowUp: () => addDays(focused, -7),
      ArrowDown: () => addDays(focused, 7),
      PageUp: () => new Date(year, month - 1, Math.min(focused.getDate(), 28)),
      PageDown: () => new Date(year, month + 1, Math.min(focused.getDate(), 28)),
    };
    if (moves[event.key]) {
      event.preventDefault();
      setFocused(moves[event.key]());
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      choose(focused);
    }
  };

  return (
    <div ref={rootRef} className={cx('rcu-field', 'rcu-datepicker', className)}>
      {label && <span id={`${id}-label`} className="rcu-field__label">{label}</span>}
      <button
        ref={buttonRef}
        type="button"
        className="rcu-control rcu-datepicker__button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-labelledby={label ? `${id}-label ${id}-value` : undefined}
        disabled={disabled}
        onClick={() => {
          setFocused(startOfDay(selected ?? new Date()));
          setOpen(!open);
        }}
      >
        <span id={`${id}-value`} className={cx(!selected && 'rcu-datepicker__placeholder')}>
          {selected ? formatDate(selected) : placeholder}
        </span>
        <span aria-hidden="true">📅</span>
      </button>
      {open && (
        <div role="dialog" aria-modal="false" aria-label="Choose date" className="rcu-datepicker__popover">
          <div className="rcu-datepicker__nav">
            <button type="button" className="rcu-icon-button" aria-label="Previous month" onClick={() => setFocused(new Date(year, month - 1, 1))}>‹</button>
            <span className="rcu-datepicker__month" aria-live="polite">
              {first.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
            </span>
            <button type="button" className="rcu-icon-button" aria-label="Next month" onClick={() => setFocused(new Date(year, month + 1, 1))}>›</button>
          </div>
          <div role="grid" className="rcu-datepicker__grid" onKeyDown={onGridKeyDown}>
            <div role="row" className="rcu-datepicker__row">
              {WEEKDAYS.map((d) => (
                <span key={d} role="columnheader" className="rcu-datepicker__weekday">{d}</span>
              ))}
            </div>
            {Array.from({ length: 6 }, (_, week) => (
              <div role="row" key={week} className="rcu-datepicker__row">
                {days.slice(week * 7, week * 7 + 7).map((day) => {
                  const isFocused = sameDay(day, focused);
                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      role="gridcell"
                      tabIndex={isFocused ? 0 : -1}
                      ref={(node) => {
                        if (isFocused && node && rootRef.current?.contains(document.activeElement) && document.activeElement !== buttonRef.current) node.focus();
                      }}
                      aria-selected={selected ? sameDay(day, selected) : false}
                      aria-current={sameDay(day, today) ? 'date' : undefined}
                      aria-label={day.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      disabled={isDisabled(day)}
                      data-outside={day.getMonth() !== month || undefined}
                      className="rcu-datepicker__day"
                      onClick={() => choose(day)}
                    >
                      {day.getDate()}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
