import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Cult Contour homepage hero', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /beauty designed around you/i })).toBeInTheDocument();
  expect(screen.getByText(/luxury makeup artistry · delhi/i)).toBeInTheDocument();
});
