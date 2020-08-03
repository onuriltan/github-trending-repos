import React from 'react';
import { render } from '@testing-library/react';
import NavBar from './NavBar';

test('renders Trending Repos as a project name', () => {
  const { getByText } = render(<NavBar />);
  const projectName = getByText(/Trending Repos/i);
  expect(projectName).toBeInTheDocument();
});
