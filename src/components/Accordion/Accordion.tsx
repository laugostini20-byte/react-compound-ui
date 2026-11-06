import { createContext, useContext, useId, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useControllableState } from '../../utils/hooks';
import './Accordion.css';

interface AccordionContextValue {
  open: string[];
  toggle: (value: string) => void;
}
const AccordionContext = createContext<AccordionContextValue | null>(null);
const ItemContext = createContext<{ value: string; id: string; isOpen: boolean } | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion parts must be rendered inside <Accordion>');
  return ctx;
}
function useItem() {
  const ctx = useContext(ItemContext);
  if (!ctx) throw new Error('<Accordion.Trigger>/<Accordion.Content> must be inside <Accordion.Item>');
  return ctx;
}

export interface AccordionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue'> {
  /** Allow more than one item open at a time. */
  multiple?: boolean;
  /** Open item values (controlled). */
  value?: string[];
  /** Initially open item values (uncontrolled). */
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  children: ReactNode;
}

function AccordionRoot({ multiple = false, value, defaultValue = [], onValueChange, className, ...props }: AccordionProps) {
  const [open, setOpen] = useControllableState(value, defaultValue, onValueChange);
  const toggle = (item: string) => {
    if (open.includes(item)) setOpen(open.filter((v) => v !== item));
    else setOpen(multiple ? [...open, item] : [item]);
  };
  return (
    <AccordionContext.Provider value={{ open, toggle }}>
      <div className={cx('rcu-accordion', className)} {...props} />
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

function AccordionItem({ value, className, ...props }: AccordionItemProps) {
  const { open } = useAccordion();
  const id = useId();
  const isOpen = open.includes(value);
  return (
    <ItemContext.Provider value={{ value, id, isOpen }}>
      <div className={cx('rcu-accordion__item', className)} data-state={isOpen ? 'open' : 'closed'} {...props} />
    </ItemContext.Provider>
  );
}

function AccordionTrigger({ className, children, ...props }: HTMLAttributes<HTMLButtonElement>) {
  const { toggle } = useAccordion();
  const { value, id, isOpen } = useItem();
  return (
    <h3 className="rcu-accordion__heading">
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        className={cx('rcu-accordion__trigger', className)}
        onClick={() => toggle(value)}
        {...props}
      >
        <span>{children}</span>
        <span className="rcu-accordion__chevron" aria-hidden="true">▾</span>
      </button>
    </h3>
  );
}

function AccordionContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { id, isOpen } = useItem();
  return (
    <div
      role="region"
      id={`${id}-content`}
      aria-labelledby={`${id}-trigger`}
      hidden={!isOpen}
      className={cx('rcu-accordion__content', className)}
      {...props}
    />
  );
}

/** Compound accordion: `<Accordion>` → `<Accordion.Item>` → `<Accordion.Trigger>` + `<Accordion.Content>`. */
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});
