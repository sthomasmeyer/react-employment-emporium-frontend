import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Company from '../components/Company';

// Smoke test:
it('renders without crashing', () => {
  render(<Company />);
});
