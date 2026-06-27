declare module 'react-hexgrid' {
  import * as React from 'react';

  export type HexGridProps = React.SVGProps<SVGSVGElement>;

  export type LayoutProps = Omit<React.SVGProps<SVGGElement>, 'origin' | 'size'> & {
    size?: { x: number; y: number };
    flat?: boolean;
    spacing?: number;
    origin?: { x: number; y: number };
    children?: React.ReactNode;
  };

  export type HexagonProps = Omit<React.SVGProps<SVGGElement>, 'transform'> & {
    q: number;
    r: number;
    s: number;
    data?: unknown;
    children?: React.ReactNode;
  };

  export function HexGrid(props: HexGridProps): JSX.Element;
  export function Layout(props: LayoutProps): JSX.Element;
  export function Hexagon(props: HexagonProps): JSX.Element;
}
