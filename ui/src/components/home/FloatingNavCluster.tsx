import React from 'react';
import { FloatingNavCard, FloatingNavCardData } from './FloatingNavCard';

type FloatingNavClusterProps = {
  cards: FloatingNavCardData[];
  className?: string;
};

export function FloatingNavCluster({ cards, className = '' }: FloatingNavClusterProps) {
  const totalCards = Math.max(cards.length, 1);

  return (
    <nav className={`floating-nav-cluster ${className}`.trim()} aria-label="Creative portfolio sections">
      {cards.map((card, index) => {
        const orbitAngleValue = (index / totalCards) * 360;
        const orbitAngle = `${orbitAngleValue}deg`;
        const inverseOrbitAngle = `${orbitAngleValue * -1}deg`;

        return (
          <div
            key={card.id}
            className="floating-nav-cluster__orbit-item"
            style={{ '--orbit-angle': orbitAngle, '--orbit-angle-inverse': inverseOrbitAngle } as React.CSSProperties}
          >
            <FloatingNavCard card={card} />
          </div>
        );
      })}
    </nav>
  );
}
