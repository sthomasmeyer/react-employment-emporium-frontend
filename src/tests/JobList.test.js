import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import JobList from '../components/JobList';

// Smoke test:
it('renders without crashing', () => {
  render(<JobList />, { wrapper: MemoryRouter });
});

it('fetches jobs from the API', async () => {
  render(<JobList />, { wrapper: MemoryRouter });

  await waitFor(() => {
    expect(screen.getByText('Accommodation manager')).toBeInTheDocument();
  });
});

it('has a functional search mechanism', async () => {
  render(<JobList />, { wrapper: MemoryRouter });

  await waitFor(() => {
    expect(screen.getByText('Accommodation manager')).toBeInTheDocument();
  });

  const searchInput = screen.getByDisplayValue('');
  fireEvent.change(searchInput, { target: { value: 'P' } });

  expect(screen.queryByText('Accommodation manager')).not.toBeInTheDocument();
  expect(screen.getByText('Producer, radio')).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: 'T' } });

  expect(screen.queryByText('Producer, radio')).not.toBeInTheDocument();
  expect(screen.getByText('Tree surgeon')).toBeInTheDocument();
});
