import React, { useRef, useState } from 'react';
import { FloatingNavCard, FloatingNavCardData } from './FloatingNavCard';

type FloatingNavClusterProps = {
  cards: FloatingNavCardData[];
  className?: string;
};

const MAX_ORBIT_ROTATION = 360;
const PORTRAIT_Z_INDEX = 100;
const ORBIT_Z_INDEX_DEPTH = 70;
const DRAG_ROTATION_MULTIPLIER = 1.4;

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

export function FloatingNavCluster({ cards, className = '' }: FloatingNavClusterProps) {
  const [orbitRotation, setOrbitRotation] = useState(0);
  const hoverSliderClientYRef = useRef<number | null>(null);
  const dragStartRef = useRef<{ pointerId: number; clientY: number; rotation: number } | null>(null);
  const totalCards = Math.max(cards.length, 1);

  const updateOrbitRotation = (rotation: number) => {
    setOrbitRotation(normalizeOrbitRotation(rotation));
  };

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

  const handleHoverSliderKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      updateOrbitRotation(orbitRotation + MAX_ORBIT_ROTATION / 20);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      updateOrbitRotation(orbitRotation - MAX_ORBIT_ROTATION / 20);
    }
  };

  const handleDragSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateOrbitRotation(Number(event.currentTarget.value));
  };

  const handleDragSliderPointerDown = (event: React.PointerEvent<HTMLInputElement>) => {
    dragStartRef.current = {
      pointerId: event.pointerId,
      clientY: event.clientY,
      rotation: orbitRotation,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handleDragSliderPointerMove = (event: React.PointerEvent<HTMLInputElement>) => {
    if (!dragStartRef.current || dragStartRef.current.pointerId !== event.pointerId) {
      return;
    }

    const distanceMoved = dragStartRef.current.clientY - event.clientY;
    updateOrbitRotation(dragStartRef.current.rotation + distanceMoved * DRAG_ROTATION_MULTIPLIER);
  };

  const handleDragSliderPointerEnd = (event: React.PointerEvent<HTMLInputElement>) => {
    if (dragStartRef.current?.pointerId === event.pointerId) {
      dragStartRef.current = null;
    }
  };

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

        return (
          <div
            key={card.id}
            className="floating-nav-cluster__orbit-item"
            style={
              {
                '--orbit-angle': orbitAngle,
                '--orbit-angle-inverse': inverseOrbitAngle,
                zIndex: orbitDepthLayer,
              } as React.CSSProperties
            }
          >
            <FloatingNavCard card={card} />
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
          role="slider"
          aria-label="Hover vertically to rotate floating navigation cards"
          aria-orientation="vertical"
          aria-valuemin={0}
          aria-valuemax={MAX_ORBIT_ROTATION}
          aria-valuenow={Math.round(orbitRotation)}
          tabIndex={0}
          onKeyDown={handleHoverSliderKeyDown}
          onPointerEnter={handleHoverSliderPointerEnter}
          onPointerMove={handleHoverSliderPointerMove}
          onPointerLeave={handleHoverSliderPointerLeave}
        >
          <span>Orbit</span>
          <div className="floating-nav-cluster__slider-pad" aria-hidden="true">
            <span className="floating-nav-cluster__slider-pad-track" />
          </div>
        </div>
        <label className="floating-nav-cluster__slider floating-nav-cluster__slider--distance">
          <span>Push</span>
          <input
            type="range"
            min="0"
            max={MAX_ORBIT_ROTATION}
            value={orbitRotation}
            aria-label="Drag vertically to spin floating navigation cards by pointer distance"
            onChange={handleDragSliderChange}
            onPointerDown={handleDragSliderPointerDown}
            onPointerMove={handleDragSliderPointerMove}
            onPointerUp={handleDragSliderPointerEnd}
            onPointerCancel={handleDragSliderPointerEnd}
            onLostPointerCapture={handleDragSliderPointerEnd}
          />
        </label>
      </div>
    </nav>
  );
}
