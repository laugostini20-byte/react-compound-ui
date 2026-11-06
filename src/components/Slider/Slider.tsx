import { useId, type CSSProperties, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useControllableState } from '../../utils/hooks';
import './Slider.css';

export interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  label?: ReactNode;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number) => void;
  /** Show the current value next to the label. */
  showValue?: boolean;
  /** Format the shown value (e.g. add a unit). */
  formatValue?: (value: number) => string;
}

export function Slider({
  label,
  value,
  defaultValue = 50,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  showValue = true,
  formatValue = String,
  id,
  className,
  ...props
}: SliderProps) {
  const [current, setCurrent] = useControllableState(value, defaultValue, onValueChange);
  const autoId = useId();
  const inputId = id ?? autoId;
  const percent = ((current - min) / (max - min)) * 100;
  return (
    <div className={cx('rcu-field', 'rcu-slider', className)}>
      {(label || showValue) && (
        <div className="rcu-slider__header">
          {label && <label htmlFor={inputId} className="rcu-field__label">{label}</label>}
          {showValue && <output htmlFor={inputId} className="rcu-slider__value">{formatValue(current)}</output>}
        </div>
      )}
      <input
        type="range"
        id={inputId}
        className="rcu-slider__input"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(event) => setCurrent(Number(event.target.value))}
        style={{ '--rcu-slider-fill': `${percent}%` } as CSSProperties}
        {...props}
      />
    </div>
  );
}
