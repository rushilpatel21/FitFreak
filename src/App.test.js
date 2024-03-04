import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/home/i);
  expect(linkElements.length).toBeGreaterThan(0);
});
