import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders EuroGranite logo', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const logoElement = screen.getByText(/eurogranite/i);
  expect(logoElement).toBeInTheDocument();
});
