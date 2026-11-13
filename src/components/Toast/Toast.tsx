import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';
import './Toast.css';

export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  /** Milliseconds before it hides on its own; `0` keeps it until dismissed. */
  duration?: number;
}

interface ToastRecord extends ToastOptions {
  id: number;
}

interface ToastApi {
  /** Shows a toast and returns its id. */
  show: (options: ToastOptions) => number;
  dismiss: (id: number) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

/** Access `show` / `dismiss`. Must be used under `<ToastProvider>`. */
export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

export interface ToastProviderProps {
  children: ReactNode;
  /** Where the stack appears. */
  position?: 'top-right' | 'bottom-right' | 'bottom-center';
}

const subscribeNoop = () => () => {};

export function ToastProvider({ children, position = 'bottom-right' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const nextId = useRef(1);

  const dismiss = useCallback((id: number) => setToasts((list) => list.filter((t) => t.id !== id)), []);
  const show = useCallback((options: ToastOptions) => {
    const id = nextId.current++;
    setToasts((list) => [...list, { id, ...options }]);
    return id;
  }, []);
  const api = useMemo(() => ({ show, dismiss }), [show, dismiss]);
  // false during server rendering and hydration, true afterwards, so SSR and the first client render match.
  const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false);

  return (
    <ToastContext.Provider value={api}>
      {children}
      {mounted &&
        createPortal(
          <div className={cx('rcu-toast-region', `rcu-toast-region--${position}`)} role="region" aria-label="Notifications">
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastRecord; onDismiss: () => void }) {
  const { title, description, tone = 'neutral', duration = 5000 } = toast;
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (duration === 0 || paused) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, paused, onDismiss]);
  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={cx('rcu-toast', `rcu-toast--${tone}`)}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
    >
      <div className="rcu-toast__text">
        <div className="rcu-toast__title">{title}</div>
        {description && <div className="rcu-toast__description">{description}</div>}
      </div>
      <button type="button" className="rcu-icon-button" aria-label="Dismiss notification" onClick={onDismiss}>×</button>
    </div>
  );
}
