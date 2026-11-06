import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react';

/** Ref that always holds the latest value, updated after render. */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}

/** State that can be controlled (`value` given) or uncontrolled (falls back to `defaultValue`). */
export function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (next: T) => void,
): [T, (next: T) => void] {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const current = isControlled ? value : internal;
  const set = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );
  return [current, set];
}

/** Calls `handler` on a pointer press outside every given element while `active`. */
export function useClickOutside(
  refs: Array<RefObject<HTMLElement | null>>,
  handler: () => void,
  active = true,
) {
  const handlerRef = useLatest(handler);
  const refsRef = useLatest(refs);
  useEffect(() => {
    if (!active) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (refsRef.current.every((ref) => !ref.current?.contains(target))) handlerRef.current();
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [active, handlerRef, refsRef]);
}

/** Calls `handler` when Escape is pressed while `active`. */
export function useEscapeKey(handler: () => void, active = true) {
  const handlerRef = useLatest(handler);
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handlerRef.current();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [active, handlerRef]);
}

/** Moves focus between `[role=menuitem]`/`[role=option]` items inside a container with arrow keys. */
export function focusSibling(container: HTMLElement, selector: string, direction: 1 | -1 | 'first' | 'last') {
  const items = Array.from(container.querySelectorAll<HTMLElement>(`${selector}:not(:disabled)`));
  if (items.length === 0) return;
  const index = items.indexOf(document.activeElement as HTMLElement);
  let next: number;
  if (direction === 'first') next = 0;
  else if (direction === 'last') next = items.length - 1;
  else next = (index + direction + items.length) % items.length;
  items[next]?.focus();
}
