import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CompanyList from '../components/CompanyList';

// Smoke test:
it('renders without crashing', () => {
  render(<CompanyList />, { wrapper: MemoryRouter });
});

it('fetches companies from the API', async () => {
  render(<CompanyList />, { wrapper: MemoryRouter });

  await waitFor(() => {
    expect(screen.getByText('Ayala-Buchanan')).toBeInTheDocument();
  });
});

it('has a functional search mechanism', async () => {
  render(<CompanyList />, { wrapper: MemoryRouter });

  await waitFor(() => {
    expect(screen.getByText('Ayala-Buchanan')).toBeInTheDocument();
  });

  const searchInput = screen.getByDisplayValue('');
  fireEvent.change(searchInput, { target: { value: 'O' } });

  expect(screen.queryByText('Ayala-Buchanan')).not.toBeInTheDocument();
  expect(screen.getByText('Owen-Newton')).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: 'A' } });

  expect(screen.getByText('Ayala-Buchanan')).toBeInTheDocument();
  expect(screen.queryByText('Owen-Newton')).not.toBeInTheDocument();
});
