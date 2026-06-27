import React from 'react';
import { BackgroundName } from './BackgroundName';
import { HoneycombCell, HoneycombGrid } from './HoneycombGrid';

const transparentCellIds = new Set([
  'cell-1-4',
  'cell-1-5',
  'cell-2-3',
  'cell-2-6',
  'cell-3-4',
  'cell-3-5',
  'cell-4-8',
  'cell-4-9',
  'cell-5-7',
  'cell-5-10',
  'cell-6-8',
  'cell-6-9',
]);

const tones: HoneycombCell['tone'][] = ['gold', 'violet', 'blue', 'mint', 'ember'];

const honeycombCells: HoneycombCell[] = Array.from({ length: 10 }, (_, row) =>
  Array.from({ length: 17 }, (_, column) => {
    const id = `cell-${row}-${column}`;

    return {
      id,
      row,
      column,
      tone: tones[(row * 3 + column * 2) % tones.length],
      transparent: transparentCellIds.has(id),
    };
  })
).flat();

export function HoneycombHome() {
  return (
    <main className="honeycomb-home" aria-label="Honeycomb reveal homepage">
      <BackgroundName name="Nimit Jain" />
      <HoneycombGrid cells={honeycombCells} />
    </main>
  );
}
