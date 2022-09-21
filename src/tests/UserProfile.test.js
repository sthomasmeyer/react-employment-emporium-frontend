import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserProfile from '../components/UserProfile';

// Smoke test:
it('renders without crashing', () => {
  render(<UserProfile />, { wrapper: MemoryRouter });
});

it('includes the [UpdateUserForm] component', () => {
  render(<UserProfile />, { wrapper: MemoryRouter });

  expect(screen.getByText('Update Account Info')).toBeInTheDocument();
});
