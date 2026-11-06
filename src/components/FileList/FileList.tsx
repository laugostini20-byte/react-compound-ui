import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { formatBytes } from '../../utils/files';
import './FileList.css';

export type FileStatus = 'queued' | 'uploading' | 'done' | 'error';

export interface FileListItem {
  id: string;
  name: string;
  size: number;
  status?: FileStatus;
  /** 0–100 while uploading. */
  progress?: number;
  /** Message shown when `status` is `error`. */
  error?: string;
}

export interface FileListProps extends HTMLAttributes<HTMLUListElement> {
  files: FileListItem[];
  /** Shows a remove button on each row. */
  onRemove?: (id: string) => void;
  /** Shows a retry button on failed rows. */
  onRetry?: (id: string) => void;
}

const STATUS_TEXT: Record<FileStatus, string> = { queued: 'Waiting', uploading: 'Uploading', done: 'Uploaded', error: 'Failed' };

/** Rows of files with size, upload progress and status. */
export function FileList({ files, onRemove, onRetry, className, ...props }: FileListProps) {
  if (files.length === 0) return null;
  return (
    <ul className={cx('rcu-file-list', className)} {...props}>
      {files.map(({ id, name, size, status = 'done', progress = 0, error }) => (
        <li key={id} className="rcu-file-list__row" data-status={status}>
          <span className="rcu-file-list__icon" aria-hidden="true">{status === 'error' ? '!' : status === 'done' ? '✓' : '▢'}</span>
          <div className="rcu-file-list__main">
            <div className="rcu-file-list__top">
              <span className="rcu-file-list__name" title={name}>{name}</span>
              <span className="rcu-file-list__meta">
                {formatBytes(size)} · {status === 'uploading' ? `${Math.round(progress)}%` : STATUS_TEXT[status]}
              </span>
            </div>
            {status === 'uploading' && (
              <div
                className="rcu-file-list__bar"
                role="progressbar"
                aria-label={`Uploading ${name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
              >
                <span style={{ width: `${progress}%` }} />
              </div>
            )}
            {status === 'error' && error && <div className="rcu-file-list__error">{error}</div>}
          </div>
          {status === 'error' && onRetry && (
            <button type="button" className="rcu-file-list__retry" onClick={() => onRetry(id)}>Retry</button>
          )}
          {onRemove && (
            <button type="button" className="rcu-icon-button" aria-label={`Remove ${name}`} onClick={() => onRemove(id)}>×</button>
          )}
        </li>
      ))}
    </ul>
  );
}
