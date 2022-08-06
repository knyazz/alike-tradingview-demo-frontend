import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Tradingview Demo header', () => {
  render(<App />);
  const linkElement = screen.getByText();
  expect(linkElement).toBeInTheDocument();
});
