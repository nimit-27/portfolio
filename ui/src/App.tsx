import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { HomeHero } from './components/home/HomeHero';
import { honeycombCells, HoneycombHome } from './components/home/HoneycombHome';
import { HoneycombGrid } from './components/home/HoneycombGrid';
import { Timeline } from './components/timeline/Timeline';
import { timelineEvents } from './data/timelineEvents';

function PlaceholderPage({ title, route }: { title: string; route: string }) {
  const selectedCell = honeycombCells.find((cell) => cell.route === route) ?? null;

  return (
    <main className="placeholder-page placeholder-page--honeycomb">
      <a href="/" className="timeline-page__home-link">← Orbit home</a>
      <div className="placeholder-page__copy">
        <h1>{title}</h1>
        <p>This section is ready for its own creative page.</p>
      </div>
      {selectedCell && (
        <div className="placeholder-page__honeycomb-anchor" aria-label={`${selectedCell.title} honeycomb position`}>
          <HoneycombGrid
            cells={[selectedCell]}
            className="honeycomb-grid--page-anchor"
            selectedCellId={selectedCell.id}
            transitionMode="vanish"
          />
        </div>
      )}
    </main>
  );
}

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => setPath(window.location.pathname);

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);
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
    return <PlaceholderPage title={sectionTitle} route={path} />;
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
