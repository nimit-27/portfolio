import React, { useMemo, useState } from 'react';

export type HoneycombCell = {
  id: string;
  row: number;
  column: number;
  title?: string;
  subtitle?: string;
  route?: string;
  icon?: string;
  tone?: 'gold' | 'violet' | 'blue' | 'mint' | 'ember';
};

type HoneycombGridProps = {
  cells: HoneycombCell[];
  className?: string;
};

function cellDistance(a: Pick<HoneycombCell, 'row' | 'column'>, b: Pick<HoneycombCell, 'row' | 'column'>) {
  const aq = a.column - Math.floor(a.row / 2);
  const ar = a.row;
  const bq = b.column - Math.floor(b.row / 2);
  const br = b.row;
  const as = -aq - ar;
  const bs = -bq - br;

  return Math.max(Math.abs(aq - bq), Math.abs(ar - br), Math.abs(as - bs));
}

export function HoneycombGrid({ cells, className = '' }: HoneycombGridProps) {
  const [hoveredCellId, setHoveredCellId] = useState<string | null>(null);
  const hoveredCell = useMemo(
    () => cells.find((cell) => cell.id === hoveredCellId) ?? null,
    [cells, hoveredCellId]
  );

  return (
    <div className={`honeycomb-grid ${className}`} onMouseLeave={() => setHoveredCellId(null)}>
      {cells.map((cell) => {
        const distance = hoveredCell ? cellDistance(cell, hoveredCell) : undefined;
        const reaction = distance === 0 ? 'active' : distance === 1 ? 'neighbor' : distance === 2 ? 'nearby' : 'idle';
        const isNavigationCell = Boolean(cell.route && cell.title);
        const content = (
          <>
            <span className="honeycomb-grid__coordinate" aria-hidden="true">
              {cell.row}.{cell.column}
            </span>
            {cell.icon && <span className="honeycomb-grid__icon" aria-hidden="true">{cell.icon}</span>}
            {cell.title && <strong>{cell.title}</strong>}
            {cell.subtitle && <small>{cell.subtitle}</small>}
          </>
        );

        return (
          <div
            className="honeycomb-grid__slot"
            style={{ gridColumn: `${cell.column + 1} / span 2`, gridRow: `${cell.row + 1}` }}
            key={cell.id}
          >
            {isNavigationCell ? (
              <a
                className={`honeycomb-grid__cell honeycomb-grid__cell--nav honeycomb-grid__cell--${cell.tone ?? 'gold'} is-${reaction}`}
                href={cell.route}
                onMouseEnter={() => setHoveredCellId(cell.id)}
                data-row={cell.row}
                data-column={cell.column}
              >
                {content}
              </a>
            ) : (
              <div
                className={`honeycomb-grid__cell honeycomb-grid__cell--decor honeycomb-grid__cell--${cell.tone ?? 'violet'} is-${reaction}`}
                onMouseEnter={() => setHoveredCellId(cell.id)}
                data-row={cell.row}
                data-column={cell.column}
                aria-label={`Decorative honeycomb cell row ${cell.row} column ${cell.column}`}
              >
                {content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
