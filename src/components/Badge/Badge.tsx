import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Badge.css';

export type BadgeTone = 'neutral' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Color of the badge. */
  tone?: BadgeTone;
  /** Show a small status dot before the label. */
  dot?: boolean;
}

export function Badge({ tone = 'neutral', dot = false, className, children, ...props }: BadgeProps) {
  return (
    <span className={cx('rcu-badge', `rcu-badge--${tone}`, className)} {...props}>
      {dot && <span className="rcu-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}
