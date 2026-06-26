import React, { useState } from 'react';
import { FloatingNavCard, FloatingNavCardData } from './FloatingNavCard';

type FloatingNavClusterProps = {
  cards: FloatingNavCardData[];
  className?: string;
};

const MAX_ORBIT_ROTATION = 360;

function getSliderRotation(event: React.PointerEvent<HTMLInputElement>) {
  const sliderBounds = event.currentTarget.getBoundingClientRect();
  const sliderProgress = (event.clientX - sliderBounds.left) / sliderBounds.width;
  const clampedProgress = Math.min(Math.max(sliderProgress, 0), 1);

  return clampedProgress * MAX_ORBIT_ROTATION;
}

export function FloatingNavCluster({ cards, className = '' }: FloatingNavClusterProps) {
  const [orbitRotation, setOrbitRotation] = useState(0);
  const totalCards = Math.max(cards.length, 1);

  const handleSliderPointerMove = (event: React.PointerEvent<HTMLInputElement>) => {
    setOrbitRotation(getSliderRotation(event));
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrbitRotation(Number(event.currentTarget.value));
  };

  return (
    <nav className={`floating-nav-cluster ${className}`.trim()} aria-label="Creative portfolio sections">
      <div className="floating-nav-cluster__orbit">
        {cards.map((card, index) => {
          const orbitAngleValue = (index / totalCards) * 360 + orbitRotation;
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
      </div>
      <label className="floating-nav-cluster__slider">
        <span>Orbit</span>
        <input
          type="range"
          min="0"
          max={MAX_ORBIT_ROTATION}
          value={orbitRotation}
          aria-label="Rotate floating navigation cards"
          onChange={handleSliderChange}
          onPointerMove={handleSliderPointerMove}
        />
      </label>
    </nav>
  );
}
