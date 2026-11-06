import { useId, useRef, useState, type DragEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { checkFile, formatBytes, type FileRules } from '../../utils/files';
import './FileDropzone.css';

export interface RejectedFile {
  file: File;
  reason: string;
}

export interface FileDropzoneProps extends FileRules {
  /** Called with files that pass the rules and those that don't. */
  onFiles: (accepted: File[], rejected: RejectedFile[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  /** Main text. */
  title?: ReactNode;
  /** Secondary text; defaults to a summary of the rules. */
  hint?: ReactNode;
  className?: string;
}

/** Drag-and-drop area that also opens the file picker on click or Enter. */
export function FileDropzone({ onFiles, accept, maxSize, multiple = true, disabled = false, title, hint, className }: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const hintId = useId();

  const handle = (list: FileList | null) => {
    if (!list || disabled) return;
    const files = multiple ? Array.from(list) : Array.from(list).slice(0, 1);
    const accepted: File[] = [];
    const rejected: RejectedFile[] = [];
    for (const file of files) {
      const reason = checkFile(file, { accept, maxSize });
      if (reason) rejected.push({ file, reason });
      else accepted.push(file);
    }
    onFiles(accepted, rejected);
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragging(false);
    handle(event.dataTransfer.files);
  };

  const rules = [accept && `Accepts ${accept}`, maxSize !== undefined && `up to ${formatBytes(maxSize)}`].filter(Boolean).join(', ');

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-describedby={hintId}
      data-dragging={dragging || undefined}
      className={cx('rcu-dropzone', className)}
      onClick={() => !disabled && inputRef.current?.click()}
      onKeyDown={(event) => {
        if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          inputRef.current?.click();
        }
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) setDragging(false);
      }}
      onDrop={onDrop}
    >
      <span className="rcu-dropzone__icon" aria-hidden="true">⇪</span>
      <span className="rcu-dropzone__title">
        {title ?? (
          <>
            <strong>Click to upload</strong> or drag and drop
          </>
        )}
      </span>
      <span id={hintId} className="rcu-dropzone__hint">{hint ?? rules}</span>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={(event) => {
          handle(event.target.files);
          event.target.value = '';
        }}
      />
    </div>
  );
}
