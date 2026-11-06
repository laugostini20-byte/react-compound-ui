import { useEffect, useId, useRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Checkbox.css';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Label shown next to the box. */
  label?: ReactNode;
  /** Helper text under the label. */
  hint?: ReactNode;
  /** Show the "partly checked" state. */
  indeterminate?: boolean;
}

export function Checkbox({ label, hint, indeterminate = false, id, className, ...props }: CheckboxProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);
  return (
    <div className={cx('rcu-checkbox', className)}>
      <input
        ref={ref}
        type="checkbox"
        id={inputId}
        className="rcu-checkbox__input"
        aria-describedby={hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {(label || hint) && (
        <div className="rcu-checkbox__text">
          {label && <label htmlFor={inputId} className="rcu-checkbox__label">{label}</label>}
          {hint && <span id={`${inputId}-hint`} className="rcu-field__hint">{hint}</span>}
        </div>
      )}
    </div>
  );
}
