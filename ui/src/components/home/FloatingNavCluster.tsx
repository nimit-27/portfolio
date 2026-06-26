import React, { useRef, useState } from 'react';
import { FloatingNavCard, FloatingNavCardData } from './FloatingNavCard';

type FloatingNavClusterProps = {
  cards: FloatingNavCardData[];
  className?: string;
};

const MAX_ORBIT_ROTATION = 360;
const DRAG_ROTATION_MULTIPLIER = 1.4;

function normalizeOrbitRotation(rotation: number) {
  return ((rotation % MAX_ORBIT_ROTATION) + MAX_ORBIT_ROTATION) % MAX_ORBIT_ROTATION;
}

function getVerticalSliderRotation(event: React.PointerEvent<HTMLInputElement>) {
  const sliderBounds = event.currentTarget.getBoundingClientRect();
  const sliderProgress = (sliderBounds.bottom - event.clientY) / sliderBounds.height;
  const clampedProgress = Math.min(Math.max(sliderProgress, 0), 1);

  return clampedProgress * MAX_ORBIT_ROTATION;
}

function getOrbitDepthLayer(angle: number) {
  const normalizedAngle = normalizeOrbitRotation(angle);
  const angleInRadians = (normalizedAngle * Math.PI) / 180;
  const depthProgress = (Math.sin(angleInRadians) + 1) / 2;

  return Math.round(depthProgress * 200);
}

export function FloatingNavCluster({ cards, className = '' }: FloatingNavClusterProps) {
  const [orbitRotation, setOrbitRotation] = useState(0);
  const dragStartRef = useRef<{ pointerId: number; clientY: number; rotation: number } | null>(null);
  const totalCards = Math.max(cards.length, 1);

  const updateOrbitRotation = (rotation: number) => {
    setOrbitRotation(normalizeOrbitRotation(rotation));
  };

  const handleSliderPointerMove = (event: React.PointerEvent<HTMLInputElement>) => {
    if (event.buttons !== 1) {
      return;
    }

    updateOrbitRotation(getVerticalSliderRotation(event));
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  return (
    <nav className={`floating-nav-cluster ${className}`.trim()} aria-label="Creative portfolio sections">
      <div className="floating-nav-cluster__orbit">
        {cards.map((card, index) => {
          const orbitAngleValue = (index / totalCards) * 360 + orbitRotation;
          const orbitAngle = `${orbitAngleValue}deg`;
          const inverseOrbitAngle = `${orbitAngleValue * -1}deg`;
          const orbitDepthLayer = getOrbitDepthLayer(orbitAngleValue);

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
      <div className="floating-nav-cluster__controls" aria-label="Orbit controls">
        <label className="floating-nav-cluster__slider floating-nav-cluster__slider--position">
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
        <label className="floating-nav-cluster__slider floating-nav-cluster__slider--distance">
          <span>Push</span>
          <input
            type="range"
            min="0"
            max={MAX_ORBIT_ROTATION}
            value={orbitRotation}
            aria-label="Drag vertically to spin floating navigation cards by pointer distance"
            onChange={handleSliderChange}
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
