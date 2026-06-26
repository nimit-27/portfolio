import React from 'react';
import { homeNavCards } from '../../data/homeNavCards';
import { BackgroundName } from './BackgroundName';
import { FloatingNavCluster } from './FloatingNavCluster';
import { ImageRotator, RotatorImage } from './ImageRotator';

const heroImages: RotatorImage[] = [
  {
    src: '/self/nimz_black_kurta.png',
    alt: 'Portrait placeholder one',
    waitTime: 2600,
  },
  {
    src: '/self/nimz_laughing_left_profile.png',
    alt: 'Portrait placeholder two',
    waitTime: 2200,
    fallbackSrc: '/logo512.png',
  },
];

export function HomeHero() {
  return (
    <main className="home-hero">
      <section className="home-hero__stage" aria-labelledby="home-hero-title">
        <BackgroundName name="Nimit Jain" />
        <div className="home-hero__portrait-shell">
          <div className="home-hero__glow" />
          <ImageRotator images={heroImages} className="home-hero__rotator" imageClassName="home-hero__image" />
        </div>
        <FloatingNavCluster cards={homeNavCards} />
        <div className="home-hero__copy">
          <h1 id="home-hero-title">Creative developer, visual thinker, and maker of curious web spaces.</h1>
          <p>Explore the orbit: a timeline of growth, selected projects, experiments, artworks, and ways to connect.</p>
        </div>
      </section>
    </main>
  );
}
