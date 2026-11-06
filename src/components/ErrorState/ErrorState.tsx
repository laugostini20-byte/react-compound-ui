import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './ErrorState.css';

export interface ErrorStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  description?: ReactNode;
  /** Short code such as "404" shown above the title. */
  code?: ReactNode;
  /** Buttons such as "Try again" or "Go home". */
  actions?: ReactNode;
  /** Replaces the default icon. */
  icon?: ReactNode;
}

/** A centered message for failed loads, empty results or missing pages. */
export function ErrorState({
  title = 'Something went wrong',
  description = 'Please try again in a moment.',
  code,
  actions,
  icon = '⚠',
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div role="alert" className={cx('rcu-error-state', className)} {...props}>
      <div className="rcu-error-state__icon" aria-hidden="true">{icon}</div>
      {code && <div className="rcu-error-state__code">{code}</div>}
      <h2 className="rcu-error-state__title">{title}</h2>
      {description && <p className="rcu-error-state__description">{description}</p>}
      {actions && <div className="rcu-error-state__actions">{actions}</div>}
    </div>
  );
}
