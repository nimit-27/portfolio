import React from 'react';
import { FloatingNavCard, FloatingNavCardData } from './FloatingNavCard';

type FloatingNavClusterProps = {
  cards: FloatingNavCardData[];
  className?: string;
};

export function FloatingNavCluster({ cards, className = '' }: FloatingNavClusterProps) {
  return (
    <nav className={`floating-nav-cluster ${className}`.trim()} aria-label="Creative portfolio sections">
      {cards.map((card) => (
        <FloatingNavCard key={card.id} card={card} />
      ))}
    </nav>
  );
}
