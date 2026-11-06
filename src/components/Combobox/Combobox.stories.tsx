import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Combobox, type ComboboxOption } from './Combobox';

const fruits: ComboboxOption[] = ['Apple', 'Apricot', 'Banana', 'Blueberry', 'Cherry', 'Grape', 'Kiwi', 'Lemon', 'Mango', 'Peach'].map(
  (label) => ({ value: label.toLowerCase(), label }),
);

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <div style={{ maxWidth: 320, minHeight: 300, fontFamily: 'var(--rcu-font)' }}>
      <Combobox label="Favorite fruit" options={fruits} value={value} onValueChange={setValue} />
      <p style={{ fontSize: 13, color: 'var(--rcu-color-text-muted)' }}>Selected: {value ?? 'none'}</p>
    </div>
  );
}

const meta = { title: 'Components/Combobox', component: Demo, tags: ['autodocs'] } satisfies Meta<typeof Demo>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
