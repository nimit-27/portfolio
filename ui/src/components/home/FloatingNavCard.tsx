import React from 'react';
import { Link } from 'react-router-dom';

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
  isClickable?: boolean;
};

export function FloatingNavCard({ card, isClickable = true }: FloatingNavCardProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isClickable) {
      event.preventDefault();
    }
  };

  return (
    <Link
      className={`floating-nav-card${isClickable ? '' : ' floating-nav-card--disabled'}`}
      to={card.route}
      aria-disabled={!isClickable}
      tabIndex={isClickable ? undefined : -1}
      onClick={handleClick}
    >
      {card.icon && <span className="floating-nav-card__icon" aria-hidden="true">{card.icon}</span>}
      <span className="floating-nav-card__content">
        <strong>{card.title}</strong>
        <small>{card.subtitle}</small>
      </span>
    </Link>
  );
}
