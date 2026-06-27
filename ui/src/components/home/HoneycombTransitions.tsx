import React from 'react';
import { HoneycombCell } from './HoneycombGrid';

export type HoneycombTransitionMode = 'expand' | 'vanish';

type HoneycombTransitionProps = {
  activeCell: HoneycombCell | null;
};

function TransitionPagePreview({ activeCell }: HoneycombTransitionProps) {
  const title = activeCell?.title ?? 'Portfolio';
  const subtitle = activeCell?.subtitle ?? 'Selected section';

  return (
    <article className="honeycomb-transition-page" aria-live="polite">
      <p>{subtitle}</p>
      <h2>{title}</h2>
      <span>Route preview: {activeCell?.route ?? '/'}</span>
    </article>
  );
}

export function HexagonExpandTransition({ activeCell }: HoneycombTransitionProps) {
  if (!activeCell) {
    return null;
  }

  return (
    <div className="honeycomb-transition honeycomb-transition--expand" aria-hidden={!activeCell}>
      <div className={`honeycomb-transition__portal honeycomb-grid__cell--${activeCell.tone ?? 'violet'}`} />
      <TransitionPagePreview activeCell={activeCell} />
    </div>
  );
}

export function HoneycombVanishTransition({ activeCell }: HoneycombTransitionProps) {
  if (!activeCell) {
    return null;
  }

  return (
    <div className="honeycomb-transition honeycomb-transition--vanish" aria-hidden={!activeCell}>
      <TransitionPagePreview activeCell={activeCell} />
    </div>
  );
}
