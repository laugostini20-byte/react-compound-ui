import { createContext, useContext, useEffect, useId, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import './Dialog.css';

interface DialogContextValue {
  close: () => void;
  titleId: string;
}
const DialogContext = createContext<DialogContextValue | null>(null);

function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('Dialog parts must be rendered inside <Dialog>');
  return ctx;
}

export type DialogSize = 'sm' | 'md' | 'lg';

export interface DialogProps extends Omit<HTMLAttributes<HTMLDialogElement>, 'open'> {
  /** Whether the dialog is shown. */
  open: boolean;
  /** Called when the dialog asks to close (Escape, backdrop click, or a close button). */
  onOpenChange: (open: boolean) => void;
  size?: DialogSize;
  /** Close when the dimmed backdrop is clicked. */
  closeOnBackdrop?: boolean;
  children: ReactNode;
}

/** Modal dialog built on the native `<dialog>` element, so focus trapping and Escape come for free. */
function DialogRoot({ open, onOpenChange, size = 'md', closeOnBackdrop = true, className, children, ...props }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => onOpenChange(false);

  return (
    <DialogContext.Provider value={{ close, titleId }}>
      <dialog
        ref={ref}
        aria-labelledby={titleId}
        className={cx('rcu-dialog', `rcu-dialog--${size}`, className)}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (closeOnBackdrop && event.target === event.currentTarget) close();
        }}
        {...props}
      >
        <div className="rcu-dialog__panel">{open && children}</div>
      </dialog>
    </DialogContext.Provider>
  );
}

function DialogHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { close } = useDialog();
  return (
    <div className={cx('rcu-dialog__header', className)} {...props}>
      <div>{children}</div>
      <button type="button" className="rcu-icon-button" aria-label="Close" onClick={close}>×</button>
    </div>
  );
}

function DialogTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  const { titleId } = useDialog();
  return <h2 id={titleId} className={cx('rcu-dialog__title', className)} {...props} />;
}

function DialogDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cx('rcu-dialog__description', className)} {...props} />;
}

function DialogBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('rcu-dialog__body', className)} {...props} />;
}

function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('rcu-dialog__footer', className)} {...props} />;
}

/** Wraps any element so clicking it closes the dialog. */
function DialogClose({ children }: { children: (close: () => void) => ReactNode }) {
  const { close } = useDialog();
  return <>{children(close)}</>;
}

/** Compound dialog: `<Dialog>` → `<Dialog.Header>` (with `<Dialog.Title>`), `<Dialog.Body>`, `<Dialog.Footer>`. */
export const Dialog = Object.assign(DialogRoot, {
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Body: DialogBody,
  Footer: DialogFooter,
  Close: DialogClose,
});
