import { render, screen } from '@testing-library/react';
import App from './App';

test('renders creative homepage navigation', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /creative developer/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /timeline/i })).toHaveAttribute('href', '/timeline');
});
