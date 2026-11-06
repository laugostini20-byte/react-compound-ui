import { useEffect, useRef, type KeyboardEvent } from 'react';
import { cx } from '../../utils/cx';
import './Lightbox.css';

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface LightboxProps {
  images: LightboxImage[];
  /** Index of the shown image, or `null` when closed. */
  index: number | null;
  onIndexChange: (index: number | null) => void;
  className?: string;
}

/** Full-screen image viewer with previous/next and keyboard arrows. Closed when `index` is `null`. */
export function Lightbox({ images, index, onIndexChange, className }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = index !== null && images[index] !== undefined;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const go = (step: number) => {
    if (index === null) return;
    onIndexChange((index + step + images.length) % images.length);
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') go(1);
    if (event.key === 'ArrowLeft') go(-1);
  };
  const image = open ? images[index] : null;

  return (
    <dialog
      ref={ref}
      aria-label="Image viewer"
      className={cx('rcu-lightbox', className)}
      onCancel={(event) => {
        event.preventDefault();
        onIndexChange(null);
      }}
      onKeyDown={onKeyDown}
      onClick={(event) => event.target === event.currentTarget && onIndexChange(null)}
    >
      {image && (
        <>
          <button type="button" className="rcu-lightbox__close" aria-label="Close" onClick={() => onIndexChange(null)}>×</button>
          <figure className="rcu-lightbox__figure">
            <img src={image.src} alt={image.alt} className="rcu-lightbox__image" />
            <figcaption className="rcu-lightbox__caption">
              {image.caption ?? image.alt}
              <span className="rcu-lightbox__count">{index! + 1} / {images.length}</span>
            </figcaption>
          </figure>
          {images.length > 1 && (
            <>
              <button type="button" className="rcu-lightbox__nav rcu-lightbox__nav--prev" aria-label="Previous image" onClick={() => go(-1)}>‹</button>
              <button type="button" className="rcu-lightbox__nav rcu-lightbox__nav--next" aria-label="Next image" onClick={() => go(1)}>›</button>
            </>
          )}
        </>
      )}
    </dialog>
  );
}
