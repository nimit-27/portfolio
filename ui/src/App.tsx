import React, { useMemo, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import { HomeHero } from './components/home/HomeHero';
import { HoneycombCell, HoneycombGrid } from './components/home/HoneycombGrid';
import { HoneycombHome } from './components/home/HoneycombHome';

type PortfolioPage = {
  title: string;
  path: string;
  description: string;
};

const portfolioPages: PortfolioPage[] = [
  { title: 'About', path: '/about', description: 'Motives, methods, and the story behind the work.' },
  { title: 'Timeline', path: '/timeline', description: 'Scroll through the story from the latest chapter backward.' },
  { title: 'Projects', path: '/projects', description: 'Built and shipped things, collected in one place.' },
  { title: 'Artworks', path: '/artworks', description: 'Visual experiments, sketches, and creative systems.' },
  { title: 'Resume', path: '/resume', description: 'Experience, skills, and highlights at a glance.' },
  { title: 'Contact', path: '/contact', description: 'A starting point for conversations and collaborations.' },
];

function buildPageHoneycombCells(page: PortfolioPage): HoneycombCell[] {
  return [
    { id: `${page.title.toLowerCase()}-title`, row: 0, column: 0, title: page.title, subtitle: page.description, icon: '⬡', tone: 'gold' },
    { id: `${page.title.toLowerCase()}-spark-left`, row: 0, column: 1, icon: '✦', tone: 'violet' },
    { id: `${page.title.toLowerCase()}-spark-right`, row: 1, column: 0, icon: '◇', tone: 'mint' },
  ];
}

function HoneycombPage({ page }: { page: PortfolioPage }) {
  const cells = useMemo(() => buildPageHoneycombCells(page), [page]);

  return (
    <main className="placeholder-page placeholder-page--honeycomb">
      <Link to="/" className="timeline-page__home-link">← Orbit home</Link>
      <div className="placeholder-page__copy">
        <h1>{page.title}</h1>
        <p>{page.description}</p>
      </div>
      <div className="placeholder-page__honeycomb-anchor" aria-label={`${page.title} honeycomb grid`}>
        <HoneycombGrid cells={cells} className="honeycomb-grid--page-anchor" />
      </div>
    </main>
  );
}

function HomePage() {
  const homepageDesigns = useMemo(() => [
    { id: 'orbit', label: 'Orbit', component: <HomeHero /> },
    { id: 'honeycomb', label: 'Honeycomb', component: <HoneycombHome /> },
  ], []);
  const [homepageDesignIndex, setHomepageDesignIndex] = useState(0);

  const toggleHomepageDesign = () => {
    setHomepageDesignIndex((currentIndex) => (currentIndex + 1) % homepageDesigns.length);
  };

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

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {portfolioPages.map((page) => (
        <Route key={page.path} path={page.path} element={<HoneycombPage page={page} />} />
      ))}
      <Route path="*" element={<HoneycombPage page={{ title: 'Page not found', path: '*', description: 'This route is still finding its place in the grid.' }} />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export { portfolioPages };
export default App;
