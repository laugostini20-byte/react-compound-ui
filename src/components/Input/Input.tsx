import { useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Input.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  /** Field label. */
  label?: ReactNode;
  /** Helper text under the field. */
  hint?: ReactNode;
  /** Error message; also marks the field invalid. */
  error?: ReactNode;
  /** Content shown inside the field, before the text (e.g. an icon or unit). */
  prefix?: ReactNode;
  /** Content shown inside the field, after the text. */
  suffix?: ReactNode;
}

export function Input({ label, hint, error, prefix, suffix, id, className, ...props }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = [hint && `${inputId}-hint`, error && `${inputId}-error`].filter(Boolean).join(' ') || undefined;
  return (
    <div className={cx('rcu-field', className)}>
      {label && <label htmlFor={inputId} className="rcu-field__label">{label}</label>}
      <div className="rcu-control rcu-input" aria-invalid={error ? true : undefined}>
        {prefix && <span className="rcu-input__affix">{prefix}</span>}
        <input
          id={inputId}
          className="rcu-input__native"
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {suffix && <span className="rcu-input__affix">{suffix}</span>}
      </div>
      {hint && <span id={`${inputId}-hint`} className="rcu-field__hint">{hint}</span>}
      {error && <span id={`${inputId}-error`} className="rcu-field__error">{error}</span>}
    </div>
  );
}
