import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Lightbox, type LightboxImage } from './Lightbox';

// Inline SVG placeholders so the story works offline.
const swatch = (color: string, label: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="${color}"/><text x="50%" y="50%" fill="white" font-family="sans-serif" font-size="48" text-anchor="middle" dominant-baseline="middle">${label}</text></svg>`,
  )}`;

const images: LightboxImage[] = [
  { src: swatch('#0f766e', 'Lagoon'), alt: 'Teal placeholder', caption: 'Lagoon' },
  { src: swatch('#f97360', 'Coral'), alt: 'Coral placeholder', caption: 'Coral' },
  { src: swatch('#102a2a', 'Deep'), alt: 'Dark placeholder', caption: 'Deep water' },
];

function Demo() {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      <div style={{ display: 'flex', gap: 12 }}>
        {images.map((img, i) => (
          <button key={img.src} type="button" onClick={() => setIndex(i)} style={{ padding: 0, border: 'none', cursor: 'zoom-in', borderRadius: 8, overflow: 'hidden' }}>
            <img src={img.src} alt={img.alt} width={160} height={100} style={{ display: 'block' }} />
          </button>
        ))}
      </div>
      <Lightbox images={images} index={index} onIndexChange={setIndex} />
    </>
  );
}

const meta = { title: 'Components/Lightbox', component: Demo, tags: ['autodocs'] } satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
