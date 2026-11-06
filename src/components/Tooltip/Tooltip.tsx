import { useId, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Tooltip.css';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Text shown in the tooltip. */
  content: ReactNode;
  side?: TooltipSide;
  /** The element the tooltip describes. Should be focusable. */
  children: ReactNode;
  className?: string;
}

/** Shows a short hint when its child is hovered or focused. */
export function Tooltip({ content, side = 'top', children, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  return (
    <span
      className={cx('rcu-tooltip', className)}
      onPointerEnter={() => setVisible(true)}
      onPointerLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      onKeyDown={(event) => event.key === 'Escape' && setVisible(false)}
      aria-describedby={visible ? id : undefined}
    >
      {children}
      <span role="tooltip" id={id} className={cx('rcu-tooltip__bubble', `rcu-tooltip__bubble--${side}`)} hidden={!visible}>
        {content}
      </span>
    </span>
  );
}
