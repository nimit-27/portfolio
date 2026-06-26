import { TimelineEvent } from '../components/timeline/timelineUtils';

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'now',
    date: '2026-06-01',
    title: 'Building a spatial portfolio',
    description: 'Designing a portfolio that behaves more like an interactive map than a static resume.',
    type: 'current',
    icon: '✦',
  },
  {
    id: 'creative-systems',
    date: '2025-03-15',
    title: 'Creative systems practice',
    description: 'Started combining interface systems, motion, and visual storytelling into reusable web patterns.',
    type: 'practice',
    icon: '◐',
  },
  {
    id: 'first-launch',
    date: '2023-09-10',
    title: 'First polished launch',
    description: 'Shipped a full project from concept through visual direction, development, and deployment.',
    type: 'milestone',
    icon: '▣',
  },
  {
    id: 'origin',
    date: '2021-01-01',
    title: 'The beginning',
    description: 'Started collecting experiments, sketches, and code fragments into a personal creative archive.',
    type: 'origin',
    icon: '◎',
  },
];
