import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Job from '../components/Job';

// Smoke test:
it('renders without crashing', () => {
  render(<Job />);
});
