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
  imageSrc?: string;
  imageAlt?: string;
  tone?: 'gold' | 'violet' | 'blue' | 'mint' | 'ember';
};

type HoneycombGridProps = {
  cells: HoneycombCell[];
  className?: string;
  selectedCellId?: string | null;
  transitionMode?: 'expand' | 'vanish';
  onNavigate?: (cell: HoneycombCell) => void;
};

type PositionedHoneycombCell = HoneycombCell & {
  q: number;
  r: number;
  s: number;
};

type NeighborDirection =
  | 'right'
  | 'left'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'none';

function offsetToCube(cell: HoneycombCell): PositionedHoneycombCell {
  const q = cell.column;
  const r = cell.row - Math.floor(cell.column / 2);
  const s = -q - r;

  return { ...cell, q, r, s };
}

function cellDistance(a: PositionedHoneycombCell, b: PositionedHoneycombCell) {
  return Math.max(Math.abs(a.q - b.q), Math.abs(a.r - b.r), Math.abs(a.s - b.s));
}

function getNeighborDirection(cell: PositionedHoneycombCell, hovered: PositionedHoneycombCell): NeighborDirection {
  const dq = cell.q - hovered.q;
  const dr = cell.r - hovered.r;
  const ds = cell.s - hovered.s;

  if (dq === 1 && dr === 0 && ds === -1) {
    return 'right';
  }

  if (dq === -1 && dr === 0 && ds === 1) {
    return 'left';
  }

  if (dq === 1 && dr === -1 && ds === 0) {
    return 'top-right';
  }

  if (dq === 0 && dr === -1 && ds === 1) {
    return 'top-left';
  }

  if (dq === 0 && dr === 1 && ds === -1) {
    return 'bottom-right';
  }

  if (dq === -1 && dr === 1 && ds === 0) {
    return 'bottom-left';
  }

  return 'none';
}

export function HoneycombGrid({ cells, className = '', selectedCellId = null, transitionMode, onNavigate }: HoneycombGridProps) {
  const [hoveredCellId, setHoveredCellId] = useState<string | null>(null);
  const positionedCells = useMemo(() => cells.map(offsetToCube), [cells]);
  const hoveredCell = useMemo(
    () => positionedCells.find((cell) => cell.id === hoveredCellId) ?? null,
    [positionedCells, hoveredCellId]
  );

  const openRoute = (cell: HoneycombCell) => {
    if (!cell.route) {
      return;
    }

    if (onNavigate) {
      onNavigate(cell);
      return;
    }

    window.location.href = cell.route;
  };

  return (
    <div className={`honeycomb-grid ${transitionMode ? `honeycomb-grid--${transitionMode}` : ''} ${selectedCellId ? 'is-transitioning' : ''} ${className}`} onMouseLeave={() => setHoveredCellId(null)}>
      <HexGrid width="100%" height="100%" viewBox="-35 -28 118 88" className="honeycomb-grid__svg">
        <Layout size={{ x: 12.2, y: 12.2 }} flat={false} spacing={1} origin={{ x: 0, y: 0 }}>
          {positionedCells.map((cell) => {
            const distance = hoveredCell ? cellDistance(cell, hoveredCell) : undefined;
            const reaction = distance === 0 ? 'active' : distance === 1 ? 'neighbor' : distance === 2 ? 'nearby' : 'idle';
            const isNavigationCell = Boolean(cell.route && cell.title);
            const direction = distance === 1 && hoveredCell ? getNeighborDirection(cell, hoveredCell) : 'none';
            const isSelected = selectedCellId === cell.id;
            const transitionClass = selectedCellId ? (isSelected ? 'is-selected' : 'is-dismissing') : '';

            return (
              <Hexagon
                className={`honeycomb-grid__cell honeycomb-grid__cell--${isNavigationCell ? 'nav' : 'decor'} honeycomb-grid__cell--${cell.tone ?? 'violet'} is-${reaction} direction-${direction} ${transitionClass}`}
                q={cell.q}
                r={cell.r}
                s={cell.s}
                key={cell.id}
                data-row={cell.row}
                data-column={cell.column}
                style={{ '--vanish-index': (cell.row * 7) + cell.column } as React.CSSProperties}
                role={isNavigationCell ? 'link' : 'img'}
                aria-label={isNavigationCell ? `${cell.title}: ${cell.subtitle}` : cell.imageAlt ?? `Decorative honeycomb cell row ${cell.row} column ${cell.column}`}
                tabIndex={isNavigationCell ? 0 : -1}
                onMouseEnter={() => setHoveredCellId(cell.id)}
                onClick={() => openRoute(cell)}
                onKeyDown={(event: React.KeyboardEvent<SVGGElement>) => {
                  if (isNavigationCell && (event.key === 'Enter' || event.key === ' ')) {
                    event.preventDefault();
                    openRoute(cell);
                  }
                }}
              >
                <foreignObject x="-9.3" y="-8.9" width="18.6" height="17.8" className="honeycomb-grid__content-shell">
                  <div className={`honeycomb-grid__content${cell.imageSrc ? ' honeycomb-grid__content--image' : ''}`}>
                    {cell.imageSrc && (
                      <img className="honeycomb-grid__self-image" src={cell.imageSrc} alt={cell.imageAlt ?? ''} />
                    )}
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
