import React from 'react';
import { HoneycombCell, HoneycombGrid } from './HoneycombGrid';

const honeycombCells: HoneycombCell[] = [
  { id: 'spark-0', row: 0, column: 1, icon: '✧', tone: 'violet' },
  { id: 'timeline', row: 0, column: 3, title: 'Timeline', subtitle: 'Scroll through the story', route: '/timeline', icon: '✦', tone: 'gold' },
  { id: 'spark-1', row: 0, column: 5, icon: '◌', tone: 'blue' },
  { id: 'about', row: 1, column: 0, title: 'About', subtitle: 'Motives and methods', route: '/about', icon: '◎', tone: 'mint' },
  { id: 'centerpiece', row: 1, column: 2, title: 'Nimit Jain', subtitle: 'Creative developer', icon: '⬡', tone: 'ember' },
  { id: 'projects', row: 1, column: 4, title: 'Projects', subtitle: 'Built and shipped things', route: '/projects', icon: '▣', tone: 'blue' },
  { id: 'spark-2', row: 1, column: 6, icon: '✺', tone: 'gold' },
  { id: 'artworks', row: 2, column: 1, title: 'Artworks', subtitle: 'Visual experiments', route: '/artworks', icon: '◐', tone: 'violet' },
  { id: 'resume', row: 2, column: 3, title: 'Resume', subtitle: 'Experience at a glance', route: '/resume', icon: '↗', tone: 'mint' },
  { id: 'contact', row: 2, column: 5, title: 'Contact', subtitle: 'Start a conversation', route: '/contact', icon: '✉', tone: 'ember' },
  { id: 'spark-3', row: 3, column: 2, icon: '✹', tone: 'blue' },
  { id: 'spark-4', row: 3, column: 4, icon: '◇', tone: 'violet' },
];

export function HoneycombHome() {
  return (
    <main className="honeycomb-home">
      <section className="honeycomb-home__stage" aria-labelledby="honeycomb-home-title">
        <div className="honeycomb-home__intro">
          <p>Alternate homepage 02</p>
          <h1 id="honeycomb-home-title">Choose a path through the hive.</h1>
          <span>Hover the hexagons to ripple energy through neighboring cells.</span>
        </div>
        <HoneycombGrid cells={honeycombCells} />
      </section>
    </main>
  );
}
