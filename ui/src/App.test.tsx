import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { AppThemeProvider } from './theme/ThemeContext';
import './i18n';

beforeAll(() => {
  class IntersectionObserverMock {
    observe() {
      return null;
    }
    unobserve() {
      return null;
    }
    disconnect() {
      return null;
    }
  }
  Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock,
  });
});

test('renders hero statement', () => {
  render(
    <AppThemeProvider>
      <App />
    </AppThemeProvider>
  );
  const heroText = screen.getByText(/I make data dance/i);
  expect(heroText).toBeInTheDocument();
});
