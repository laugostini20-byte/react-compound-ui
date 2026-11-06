import { useEffect, useState, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './CodeBlock.css';

export interface CodeBlockProps extends HTMLAttributes<HTMLDivElement> {
  /** The source code to show. */
  code: string;
  /** Language label shown in the header (no highlighting is applied). */
  language?: string;
  /** Optional file name shown in the header. */
  filename?: string;
  showLineNumbers?: boolean;
  /** Show a copy-to-clipboard button. */
  copyable?: boolean;
}

/** A read-only code sample with an optional header, line numbers and copy button. */
export function CodeBlock({ code, language, filename, showLineNumbers = false, copyable = true, className, ...props }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
    } catch {
      /* clipboard unavailable: leave the button as-is */
    }
  };

  const lines = code.replace(/\n$/, '').split('\n');
  const hasHeader = Boolean(filename || language || copyable);

  return (
    <div className={cx('rcu-code-block', className)} {...props}>
      {hasHeader && (
        <div className="rcu-code-block__header">
          <span className="rcu-code-block__meta">
            {filename && <span className="rcu-code-block__filename">{filename}</span>}
            {language && <span className="rcu-code-block__language">{language}</span>}
          </span>
          {copyable && (
            <button type="button" className="rcu-code-block__copy" onClick={copy} aria-live="polite">
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <pre className="rcu-code-block__pre" tabIndex={0}>
        <code>
          {lines.map((line, i) => (
            <span key={i} className="rcu-code-block__line">
              {showLineNumbers && <span className="rcu-code-block__number" aria-hidden="true">{i + 1}</span>}
              {line || ' '}
              {'\n'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
