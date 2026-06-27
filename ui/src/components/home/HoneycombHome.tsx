import React from 'react';
import { BackgroundName } from './BackgroundName';
import { HoneycombCell, HoneycombGrid } from './HoneycombGrid';

const honeycombCells: HoneycombCell[] = [
  // Row 0
  { id: 'spark-00', row: 0, column: 0, icon: '✦', tone: 'blue' },
  { id: 'spark-0', row: 0, column: 1, imageSrc: '/self/nimz_black_kurta.png', imageAlt: 'Nimit in a black kurta', tone: 'violet' },
  { id: 'spark-01', row: 0, column: 2, icon: '◇', tone: 'mint' },
  { id: 'timeline', row: 0, column: 3, icon: '✦', tone: 'gold' },
  { id: 'spark-02', row: 0, column: 4, icon: '✺', tone: 'ember' },
  { id: 'spark-1', row: 0, column: 5, icon: '◌', tone: 'blue' },
  { id: 'spark-03', row: 0, column: 6, icon: '✧', tone: 'gold' },

  // Row 1
  { id: 'about', row: 1, column: 0, icon: '◎', tone: 'mint' },
  { id: 'spark-10', row: 1, column: 1, icon: '✹', tone: 'violet' },
  { id: 'centerpiece', row: 1, column: 2, tone: 'ember', transparent: true },
  { id: 'spark-11', row: 1, column: 3, imageSrc: '/self/nimz_laughing_left_profile.png', imageAlt: 'Nimit laughing in profile', tone: 'gold' },
  { id: 'projects', row: 1, column: 4, tone: 'blue', transparent: true },
  { id: 'spark-12', row: 1, column: 5, icon: '✧', tone: 'mint' },
  { id: 'spark-2', row: 1, column: 6, icon: '✺', tone: 'gold' },

  // Row 2
  { id: 'spark-20', row: 2, column: 0, icon: '◇', tone: 'blue' },
  { id: 'artworks', row: 2, column: 1, tone: 'violet', transparent: true },
  { id: 'spark-21', row: 2, column: 2, icon: '✹', tone: 'gold' },
  { id: 'resume', row: 2, column: 3, tone: 'mint', transparent: true },
  { id: 'spark-22', row: 2, column: 4, icon: '✦', tone: 'ember' },
  { id: 'contact', row: 2, column: 5, tone: 'ember', transparent: true },
  { id: 'spark-23', row: 2, column: 6, icon: '◌', tone: 'violet' },

  // Row 3
  { id: 'spark-30', row: 3, column: 0, imageSrc: '/self/nimz_standing_arms_crossed.png', imageAlt: 'Nimit standing with arms crossed', tone: 'mint' },
  { id: 'spark-31', row: 3, column: 1, icon: '✧', tone: 'blue' },
  { id: 'spark-3', row: 3, column: 2, icon: '✹', tone: 'blue' },
  { id: 'spark-32', row: 3, column: 3, icon: '◇', tone: 'gold' },
  { id: 'spark-4', row: 3, column: 4, imageSrc: '/self/nimz_black_kurta.png', imageAlt: 'Nimit portrait in a honeycomb cell', tone: 'violet' },
  { id: 'spark-33', row: 3, column: 5, icon: '✦', tone: 'ember' },
  { id: 'spark-34', row: 3, column: 6, icon: '◈', tone: 'mint' },
];

export function HoneycombHome() {
  return (
    <main className="honeycomb-home" aria-label="Honeycomb reveal homepage">
      <BackgroundName name="Nimit Jain" />
      <HoneycombGrid cells={honeycombCells} />
    </main>
  );
}
