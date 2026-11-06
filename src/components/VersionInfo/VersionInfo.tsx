import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './VersionInfo.css';

export interface VersionInfoProps extends HTMLAttributes<HTMLDivElement> {
  /** App or package version, e.g. "1.4.2". */
  version: string;
  /** Deployment environment; non-production values are highlighted. */
  environment?: 'production' | 'staging' | 'development' | (string & {});
  /** Short commit hash. */
  commit?: string;
  /** Build time. */
  builtAt?: Date | string;
  /** Link to release notes. */
  changelogHref?: string;
  label?: ReactNode;
}

/** A small footer strip showing which build is running. */
export function VersionInfo({ version, environment, commit, builtAt, changelogHref, label = 'Version', className, ...props }: VersionInfoProps) {
  const built = builtAt ? new Date(builtAt) : null;
  return (
    <div className={cx('rcu-version-info', className)} {...props}>
      <span>
        {label} <strong>v{version}</strong>
      </span>
      {environment && (
        <span className={cx('rcu-version-info__env', environment !== 'production' && 'rcu-version-info__env--non-prod')}>
          {environment}
        </span>
      )}
      {commit && <code className="rcu-version-info__commit">{commit.slice(0, 7)}</code>}
      {built && <time dateTime={built.toISOString()}>{built.toLocaleString()}</time>}
      {changelogHref && <a href={changelogHref} className="rcu-version-info__link">What’s new</a>}
    </div>
  );
}
