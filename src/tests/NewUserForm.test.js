import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NewUserForm from '../components/NewUserForm';

// Smoke test:
it('renders without crashing', () => {
  render(<NewUserForm />, { wrapper: MemoryRouter });
});

it('renders w/ expected JSX', () => {
  render(<NewUserForm />, { wrapper: MemoryRouter });

  expect(screen.getByText('Create')).toBeInTheDocument();
});
