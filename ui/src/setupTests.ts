// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock('react-hexgrid', () => {
  const React = require('react');

  return {
    HexGrid: ({ children, ...props }: any) => React.createElement('svg', props, children),
    Layout: ({ children, ...props }: any) => React.createElement('g', props, children),
    Hexagon: ({ children, className, q, r, s, ...props }: any) => React.createElement('g', { className, 'data-q': q, 'data-r': r, 'data-s': s, ...props }, children),
  };
});
