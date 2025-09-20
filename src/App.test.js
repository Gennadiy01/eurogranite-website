import { render, screen } from '@testing-library/react';
import App from './App';

// Mock React Router
jest.mock('react-router-dom');

test('renders EuroGranite logo', () => {
  render(<App />);
  const logoElements = screen.getAllByText(/eurogranite/i);
  expect(logoElements.length).toBeGreaterThan(0);
  expect(logoElements[0]).toBeInTheDocument();
});
