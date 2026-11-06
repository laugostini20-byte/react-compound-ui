import { useId, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useControllableState } from '../../utils/hooks';
import './Switch.css';

export interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  /** On/off state (controlled). */
  checked?: boolean;
  /** Initial state (uncontrolled). */
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Label shown next to the switch. */
  label?: ReactNode;
}

export function Switch({ checked, defaultChecked = false, onCheckedChange, label, id, className, onClick, ...props }: SwitchProps) {
  const [on, setOn] = useControllableState(checked, defaultChecked, onCheckedChange);
  const autoId = useId();
  const switchId = id ?? autoId;
  return (
    <div className={cx('rcu-switch', className)}>
      <button
        type="button"
        role="switch"
        id={switchId}
        aria-checked={on}
        className="rcu-switch__track"
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setOn(!on);
        }}
        {...props}
      >
        <span className="rcu-switch__thumb" />
      </button>
      {label && <label htmlFor={switchId} className="rcu-switch__label">{label}</label>}
    </div>
  );
}
