import { Children, isValidElement, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Breadcrumbs.css';

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Character or element shown between items. */
  separator?: ReactNode;
}

function BreadcrumbsRoot({ separator = '/', className, children, ...props }: BreadcrumbsProps) {
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <nav aria-label="Breadcrumb" className={cx('rcu-breadcrumbs', className)} {...props}>
      <ol className="rcu-breadcrumbs__list">
        {items.map((child, index) => (
          <li key={child.key ?? index} className="rcu-breadcrumbs__item">
            {child}
            {index < items.length - 1 && (
              <span className="rcu-breadcrumbs__separator" aria-hidden="true">{separator}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export interface BreadcrumbsLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Marks the current page (rendered as plain text). */
  current?: boolean;
}

function BreadcrumbsLink({ current = false, className, href, ...props }: BreadcrumbsLinkProps) {
  if (current) return <span aria-current="page" className={cx('rcu-breadcrumbs__current', className)} {...props} />;
  return <a href={href} className={cx('rcu-breadcrumbs__link', className)} {...props} />;
}

/** Compound breadcrumbs: `<Breadcrumbs>` containing `<Breadcrumbs.Link>`s; mark the last one `current`. */
export const Breadcrumbs = Object.assign(BreadcrumbsRoot, { Link: BreadcrumbsLink });
