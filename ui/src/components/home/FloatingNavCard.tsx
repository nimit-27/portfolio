import React from 'react';

export type FloatingCardPosition = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  transform?: string;
};

export type FloatingNavCardData = {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  icon?: string;
  position: FloatingCardPosition;
};

type FloatingNavCardProps = {
  card: FloatingNavCardData;
};

export function FloatingNavCard({ card }: FloatingNavCardProps) {
  return (
    <a className="floating-nav-card" href={card.route}>
      {card.icon && <span className="floating-nav-card__icon" aria-hidden="true">{card.icon}</span>}
      <span className="floating-nav-card__content">
        <strong>{card.title}</strong>
        <small>{card.subtitle}</small>
      </span>
    </a>
  );
}
