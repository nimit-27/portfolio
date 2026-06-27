import React, { useMemo, useState } from 'react';
import { Hexagon, HexGrid, Layout } from 'react-hexgrid';

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

type PositionedHoneycombCell = HoneycombCell & {
  q: number;
  r: number;
  s: number;
};

function offsetToCube(cell: HoneycombCell): PositionedHoneycombCell {
  const q = cell.column;
  const r = cell.row - Math.floor(cell.column / 2);
  const s = -q - r;

  return { ...cell, q, r, s };
}

function cellDistance(a: PositionedHoneycombCell, b: PositionedHoneycombCell) {
  return Math.max(Math.abs(a.q - b.q), Math.abs(a.r - b.r), Math.abs(a.s - b.s));
}

export function HoneycombGrid({ cells, className = '' }: HoneycombGridProps) {
  const [hoveredCellId, setHoveredCellId] = useState<string | null>(null);
  const positionedCells = useMemo(() => cells.map(offsetToCube), [cells]);
  const hoveredCell = useMemo(
    () => positionedCells.find((cell) => cell.id === hoveredCellId) ?? null,
    [positionedCells, hoveredCellId]
  );

  const openRoute = (route?: string) => {
    if (route) {
      window.location.href = route;
    }
  };

  return (
    <div className={`honeycomb-grid ${className}`} onMouseLeave={() => setHoveredCellId(null)}>
      <HexGrid width="100%" height="100%" viewBox="-32 -22 104 76" className="honeycomb-grid__svg">
        <Layout size={{ x: 9.8, y: 9.8 }} flat={false} spacing={1} origin={{ x: 0, y: 0 }}>
          {positionedCells.map((cell) => {
            const distance = hoveredCell ? cellDistance(cell, hoveredCell) : undefined;
            const reaction = distance === 0 ? 'active' : distance === 1 ? 'neighbor' : distance === 2 ? 'nearby' : 'idle';
            const isNavigationCell = Boolean(cell.route && cell.title);

            return (
              <Hexagon
                className={`honeycomb-grid__cell honeycomb-grid__cell--${isNavigationCell ? 'nav' : 'decor'} honeycomb-grid__cell--${cell.tone ?? 'violet'} is-${reaction}`}
                q={cell.q}
                r={cell.r}
                s={cell.s}
                key={cell.id}
                data-row={cell.row}
                data-column={cell.column}
                role={isNavigationCell ? 'link' : 'img'}
                aria-label={isNavigationCell ? `${cell.title}: ${cell.subtitle}` : `Decorative honeycomb cell row ${cell.row} column ${cell.column}`}
                tabIndex={isNavigationCell ? 0 : -1}
                onMouseEnter={() => setHoveredCellId(cell.id)}
                onClick={() => openRoute(cell.route)}
                onKeyDown={(event) => {
                  if (isNavigationCell && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault();
                    openRoute(cell.route);
                  }
                }}
              >
                <foreignObject x="-7.2" y="-6.8" width="14.4" height="13.6" className="honeycomb-grid__content-shell">
                  <div className="honeycomb-grid__content">
                    <span className="honeycomb-grid__coordinate" aria-hidden="true">
                      {cell.row}.{cell.column}
                    </span>
                    {cell.icon && <span className="honeycomb-grid__icon" aria-hidden="true">{cell.icon}</span>}
                    {cell.title && <strong>{cell.title}</strong>}
                    {cell.subtitle && <small>{cell.subtitle}</small>}
                  </div>
                </foreignObject>
              </Hexagon>
            );
          })}
        </Layout>
      </HexGrid>
    </div>
  );
}
