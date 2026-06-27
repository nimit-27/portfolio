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
  hexWidth?: number;
};

const HEX_HEIGHT_RATIO = 0.866;
const X_STEP_RATIO = 0.75;

function cellDistance(a: Pick<HoneycombCell, 'row' | 'column'>, b: Pick<HoneycombCell, 'row' | 'column'>) {
  const aq = a.column;
  const ar = a.row - Math.floor(a.column / 2);
  const bq = b.column;
  const br = b.row - Math.floor(b.column / 2);
  const as = -aq - ar;
  const bs = -bq - br;

  return Math.max(Math.abs(aq - bq), Math.abs(ar - br), Math.abs(as - bs));
}

export function HoneycombGrid({ cells, className = '', hexWidth = 144 }: HoneycombGridProps) {
  const [hoveredCellId, setHoveredCellId] = useState<string | null>(null);
  const hoveredCell = useMemo(
    () => cells.find((cell) => cell.id === hoveredCellId) ?? null,
    [cells, hoveredCellId]
  );
  const { hexHeight, positionedCells, gridWidth, gridHeight } = useMemo(() => {
    const calculatedHexHeight = hexWidth * HEX_HEIGHT_RATIO;
    const xStep = hexWidth * X_STEP_RATIO;
    const yStep = calculatedHexHeight;
    const positioned = cells.map((cell) => {
      const oddColumnOffset = cell.column % 2 === 1 ? calculatedHexHeight / 2 : 0;
      return {
        ...cell,
        x: cell.column * xStep,
        y: cell.row * yStep + oddColumnOffset,
      };
    });
    const maxX = Math.max(...positioned.map((cell) => cell.x), 0) + hexWidth;
    const maxY = Math.max(...positioned.map((cell) => cell.y), 0) + calculatedHexHeight;

    return { hexHeight: calculatedHexHeight, positionedCells: positioned, gridWidth: maxX, gridHeight: maxY };
  }, [cells, hexWidth]);

  return (
    <div
      className={`honeycomb-grid ${className}`}
      onMouseLeave={() => setHoveredCellId(null)}
      style={{ width: gridWidth, height: gridHeight, '--hex-width': `${hexWidth}px`, '--hex-height': `${hexHeight}px` } as React.CSSProperties}
    >
      {positionedCells.map((cell) => {
        const distance = hoveredCell ? cellDistance(cell, hoveredCell) : undefined;
        const reaction = distance === 0 ? 'active' : distance === 1 ? 'neighbor' : distance === 2 ? 'nearby' : 'idle';
        const isNavigationCell = Boolean(cell.route && cell.title);
        const zIndex = reaction === 'active' ? 8 : reaction === 'neighbor' ? 5 : reaction === 'nearby' ? 3 : 1;
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
            style={{ transform: `translate(${cell.x}px, ${cell.y}px)`, zIndex }}
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
