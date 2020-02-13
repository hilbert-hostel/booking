import React from 'react';
import { render } from '@testing-library/react';
import { Home } from './index';
import { renderWithRouter } from '../../core/testing/renderWithRouter';

test('renders login link', () => {
  const { getByText } = renderWithRouter(<Home />);
  const linkElement = getByText(/Go to Login/i);
  expect(linkElement).toBeInTheDocument();
});
