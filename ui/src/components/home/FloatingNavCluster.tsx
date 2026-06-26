import React, { useRef, useState } from 'react';
import { FloatingNavCard, FloatingNavCardData } from './FloatingNavCard';

type FloatingNavClusterProps = {
  cards: FloatingNavCardData[];
  className?: string;
};

const MAX_ORBIT_ROTATION = 360;
const PORTRAIT_Z_INDEX = 100;
const ORBIT_Z_INDEX_DEPTH = 70;

function normalizeOrbitRotation(rotation: number) {
  return ((rotation % MAX_ORBIT_ROTATION) + MAX_ORBIT_ROTATION) % MAX_ORBIT_ROTATION;
}

function getRelativeSliderRotation(event: React.PointerEvent<HTMLElement>, previousClientY: number) {
  const sliderBounds = event.currentTarget.getBoundingClientRect();
  const distanceMoved = event.clientY - previousClientY;

  if (sliderBounds.height === 0) {
    return 0;
  }

  return (distanceMoved / sliderBounds.height) * MAX_ORBIT_ROTATION;
}

function getVerticalOrbitPosition(angle: number) {
  const normalizedAngle = normalizeOrbitRotation(angle);
  const angleInRadians = (normalizedAngle * Math.PI) / 180;

  return Math.sin(angleInRadians);
}

function getOrbitDepthLayer(verticalOrbitPosition: number) {
  return Math.round(PORTRAIT_Z_INDEX + verticalOrbitPosition * ORBIT_Z_INDEX_DEPTH);
}

function getCenteredCardIndex(cards: FloatingNavCardData[], orbitRotation: number) {
  if (cards.length === 0) {
    return -1;
  }

  return cards.reduce((centeredIndex, _card, index) => {
    const currentAngle = (index / cards.length) * MAX_ORBIT_ROTATION + orbitRotation;
    const centeredAngle = (centeredIndex / cards.length) * MAX_ORBIT_ROTATION + orbitRotation;

    return getVerticalOrbitPosition(currentAngle) > getVerticalOrbitPosition(centeredAngle) ? index : centeredIndex;
  }, 0);
}

export function FloatingNavCluster({ cards, className = '' }: FloatingNavClusterProps) {
  const [orbitRotation, setOrbitRotation] = useState(0);
  const hoverSliderClientYRef = useRef<number | null>(null);
  const totalCards = Math.max(cards.length, 1);

  const handleHoverSliderPointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    hoverSliderClientYRef.current = event.clientY;
  };

  const handleHoverSliderPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (hoverSliderClientYRef.current === null) {
      hoverSliderClientYRef.current = event.clientY;
      return;
    }

    const rotationDelta = getRelativeSliderRotation(event, hoverSliderClientYRef.current);
    hoverSliderClientYRef.current = event.clientY;

    if (rotationDelta !== 0) {
      setOrbitRotation((currentRotation) => normalizeOrbitRotation(currentRotation + rotationDelta));
    }
  };

  const handleHoverSliderPointerLeave = () => {
    hoverSliderClientYRef.current = null;
  };

  const openCenteredCard = () => {
    const centeredCardIndex = getCenteredCardIndex(cards, orbitRotation);
    const centeredCard = cards[centeredCardIndex];

    if (centeredCard) {
      window.location.href = centeredCard.route;
    }
  };

  const handleHoverSliderKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCenteredCard();
    }
  };

  const centeredCardIndex = getCenteredCardIndex(cards, orbitRotation);

  const renderOrbitLayer = (isFrontLayer: boolean) => (
    <div
      className={`floating-nav-cluster__orbit floating-nav-cluster__orbit--${isFrontLayer ? 'front' : 'back'}`}
    >
      {cards.map((card, index) => {
        const orbitAngleValue = (index / totalCards) * 360 + orbitRotation;
        const verticalOrbitPosition = getVerticalOrbitPosition(orbitAngleValue);
        const isCardInFront = verticalOrbitPosition >= 0;

        if (isCardInFront !== isFrontLayer) {
          return null;
        }

        const orbitAngle = `${orbitAngleValue}deg`;
        const inverseOrbitAngle = `${orbitAngleValue * -1}deg`;
        const orbitDepthLayer = getOrbitDepthLayer(verticalOrbitPosition);
        const isCenteredCard = index === centeredCardIndex;

        return (
          <div
            key={card.id}
            className={`floating-nav-cluster__orbit-item${isCenteredCard ? ' floating-nav-cluster__orbit-item--centered' : ''}`}
            style={
              {
                '--orbit-angle': orbitAngle,
                '--orbit-angle-inverse': inverseOrbitAngle,
                zIndex: orbitDepthLayer,
              } as React.CSSProperties
            }
          >
            <FloatingNavCard card={card} isClickable={isCenteredCard} />
          </div>
        );
      })}
    </div>
  );

  return (
    <nav className={`floating-nav-cluster ${className}`.trim()} aria-label="Creative portfolio sections">
      {renderOrbitLayer(false)}
      {renderOrbitLayer(true)}
      <div className="floating-nav-cluster__controls" aria-label="Orbit controls">
        <div
          className="floating-nav-cluster__slider floating-nav-cluster__slider--position"
          role="button"
          aria-label="Open the centered floating navigation card"
          tabIndex={0}
          onClick={openCenteredCard}
          onKeyDown={handleHoverSliderKeyDown}
          onPointerEnter={handleHoverSliderPointerEnter}
          onPointerMove={handleHoverSliderPointerMove}
          onPointerLeave={handleHoverSliderPointerLeave}
        />
      </div>
    </nav>
  );
}
