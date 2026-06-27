import React, { useMemo, useState } from 'react';
import './App.css';
import { HomeHero } from './components/home/HomeHero';
import { HoneycombHome } from './components/home/HoneycombHome';
import { Timeline } from './components/timeline/Timeline';
import { timelineEvents } from './data/timelineEvents';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="placeholder-page">
      <a href="/" className="timeline-page__home-link">← Orbit home</a>
      <h1>{title}</h1>
      <p>This section is ready for its own creative page.</p>
    </main>
  );
}

function App() {
  const path = window.location.pathname;
  const homepageDesigns = useMemo(() => [
    { id: 'orbit', label: 'Orbit', component: <HomeHero /> },
    { id: 'honeycomb', label: 'Honeycomb', component: <HoneycombHome /> },
  ], []);
  const [homepageDesignIndex, setHomepageDesignIndex] = useState(0);

  const toggleHomepageDesign = () => {
    setHomepageDesignIndex((currentIndex) => (currentIndex + 1) % homepageDesigns.length);
  };

  if (path === '/timeline') {
    return <Timeline startDate="2021-01-01" events={timelineEvents} scaleByDate pixelsPerYear={190} itemGap={230} />;
  }

  const sectionTitle = path.replace('/', '').replace('-', ' ');
  if (sectionTitle) {
    return <PlaceholderPage title={sectionTitle} />;
  }

  const activeDesign = homepageDesigns[homepageDesignIndex];

  return (
    <>
      <button className="homepage-design-toggle" type="button" onClick={toggleHomepageDesign}>
        <span>Homepage</span>
        <strong>{activeDesign.label}</strong>
      </button>
      {activeDesign.component}
    </>
  );
}

export default App;
