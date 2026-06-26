import { FloatingNavCardData } from '../components/home/FloatingNavCard';

export const homeNavCards: FloatingNavCardData[] = [
  {
    id: 'timeline',
    title: 'Timeline',
    subtitle: 'Scroll backward through the story',
    route: '/timeline',
    icon: '✦',
    position: { top: '8%', left: '10%', transform: 'rotate(-5deg)' },
  },
  {
    id: 'projects',
    title: 'Projects',
    subtitle: 'Built things, shipped things',
    route: '/projects',
    icon: '▣',
    position: { top: '14%', right: '8%', transform: 'rotate(4deg)' },
  },
  {
    id: 'artworks',
    title: 'Artworks',
    subtitle: 'Visual studies and experiments',
    route: '/artworks',
    icon: '◐',
    position: { right: '4%', bottom: '30%', transform: 'rotate(8deg)' },
  },
  {
    id: 'about',
    title: 'About',
    subtitle: 'Motives, methods, materials',
    route: '/about',
    icon: '◎',
    position: { left: '4%', bottom: '30%', transform: 'rotate(-7deg)' },
  },
  {
    id: 'contact',
    title: 'Contact',
    subtitle: 'Start a conversation',
    route: '/contact',
    icon: '✉',
    position: { bottom: '8%', left: '19%', transform: 'rotate(3deg)' },
  },
  {
    id: 'resume',
    title: 'Resume',
    subtitle: 'Experience at a glance',
    route: '/resume',
    icon: '↗',
    position: { right: '18%', bottom: '7%', transform: 'rotate(-3deg)' },
  },
];
