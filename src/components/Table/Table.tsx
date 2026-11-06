import type { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Table.css';

export type SortDirection = 'ascending' | 'descending' | 'none';

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Alternate row shading. */
  striped?: boolean;
  /** Tighter row padding. */
  dense?: boolean;
  /** Visible or screen-reader caption describing the table. */
  caption?: string;
  hideCaption?: boolean;
}

function TableRoot({ striped, dense, caption, hideCaption, className, children, ...props }: TableProps) {
  return (
    <div className="rcu-table-wrap">
      <table className={cx('rcu-table', striped && 'rcu-table--striped', dense && 'rcu-table--dense', className)} {...props}>
        {caption && <caption className={cx('rcu-table__caption', hideCaption && 'rcu-visually-hidden')}>{caption}</caption>}
        {children}
      </table>
    </div>
  );
}

const Head = (props: HTMLAttributes<HTMLTableSectionElement>) => <thead {...props} />;
const Body = (props: HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />;
const Row = ({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) => (
  <tr className={cx('rcu-table__row', className)} {...props} />
);

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Makes the header a sort button showing this direction. */
  sort?: SortDirection;
  onSort?: () => void;
  align?: 'left' | 'right' | 'center';
}

function HeaderCell({ sort, onSort, align = 'left', className, children, ...props }: TableHeaderCellProps) {
  return (
    <th scope="col" aria-sort={sort} className={cx('rcu-table__th', `rcu-table--align-${align}`, className)} {...props}>
      {onSort ? (
        <button type="button" className="rcu-table__sort" onClick={onSort}>
          {children}
          <span aria-hidden="true" className="rcu-table__sort-icon">
            {sort === 'ascending' ? '▲' : sort === 'descending' ? '▼' : '↕'}
          </span>
        </button>
      ) : (
        children
      )}
    </th>
  );
}

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'right' | 'center';
}

function Cell({ align = 'left', className, ...props }: TableCellProps) {
  return <td className={cx('rcu-table__td', `rcu-table--align-${align}`, className)} {...props} />;
}

/** Compound table: `<Table>` → `<Table.Head>` / `<Table.Body>` → `<Table.Row>` → `<Table.HeaderCell>` / `<Table.Cell>`. */
export const Table = Object.assign(TableRoot, { Head, Body, Row, HeaderCell, Cell });
