import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import './Card.css';

type DivProps = HTMLAttributes<HTMLDivElement>;

function CardRoot({ className, ...props }: DivProps) {
  return <div className={cx('rcu-card', className)} {...props} />;
}

function CardHeader({ className, ...props }: DivProps) {
  return <div className={cx('rcu-card__header', className)} {...props} />;
}

function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cx('rcu-card__title', className)} {...props} />;
}

function CardBody({ className, ...props }: DivProps) {
  return <div className={cx('rcu-card__body', className)} {...props} />;
}

function CardFooter({ className, ...props }: DivProps) {
  return <div className={cx('rcu-card__footer', className)} {...props} />;
}

/**
 * Compound card: compose `Card.Header`, `Card.Title`, `Card.Body` and `Card.Footer`
 * inside `<Card>` in whatever order you need.
 */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Body: CardBody,
  Footer: CardFooter,
});
