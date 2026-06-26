import React from 'react';

type BackgroundNameProps = {
  name: string;
  eyebrow?: string;
};

export function BackgroundName({ name, eyebrow }: BackgroundNameProps) {
  return (
    <div className="background-name" aria-hidden="true">
      {eyebrow && <span className="background-name__eyebrow">{eyebrow}</span>}
      <span className="background-name__text">{name}</span>
    </div>
  );
}
