import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { HoneycombGrid } from './HoneycombGrid';
import { HoneycombHome, honeycombCells } from './HoneycombHome';

function LeaveHome() {
  const navigate = useNavigate();
  return <button onClick={() => navigate('/elsewhere')}>Leave home</button>;
}

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test.each(['expand', 'vanish'])('routes after the %s transition', (mode) => {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<HoneycombHome />} />
        <Route path="/timeline" element={<h1>Timeline destination</h1>} />
      </Routes>
    </MemoryRouter>
  );
  if (mode === 'vanish') fireEvent.click(screen.getByRole('button', { name: /transition/i }));
  fireEvent.click(screen.getByRole('link', { name: /^timeline:/i }));
  expect(screen.queryByRole('heading', { name: 'Timeline destination' })).not.toBeInTheDocument();
  act(() => jest.advanceTimersByTime(mode === 'expand' ? 1500 : 2000));
  expect(screen.getByRole('heading', { name: 'Timeline destination' })).toBeInTheDocument();
});

test.each(honeycombCells.filter((cell) => cell.route))('routes $title using the grid fallback and keyboard', (cell) => {
  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<HoneycombGrid cells={[cell]} />} />
        <Route path={cell.route} element={<h1>Destination</h1>} />
      </Routes>
    </MemoryRouter>
  );
  fireEvent.keyDown(screen.getByRole('link'), { key: 'Enter' });
  expect(screen.getByRole('heading', { name: 'Destination' })).toBeInTheDocument();
});

test('cancels pending keyboard navigation when the home page unmounts', () => {
  render(
    <MemoryRouter>
      <LeaveHome />
      <Routes>
        <Route path="/" element={<HoneycombHome />} />
        <Route path="/elsewhere" element={<h1>Elsewhere</h1>} />
        <Route path="/timeline" element={<h1>Timeline destination</h1>} />
      </Routes>
    </MemoryRouter>
  );
  fireEvent.keyDown(screen.getByRole('link', { name: /^timeline:/i }), { key: ' ' });
  fireEvent.click(screen.getByRole('button', { name: 'Leave home' }));
  act(() => jest.advanceTimersByTime(3000));
  expect(screen.getByRole('heading', { name: 'Elsewhere' })).toBeInTheDocument();
});
