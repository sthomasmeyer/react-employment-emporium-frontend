import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import App from './App';
import ErrorElement from './components/ErrorElement';
import NewUserForm from './components/NewUserForm';
import CompanyList from './components/CompanyList';
import DefaultMessage from './components/DefaultMessage';
import Company from './components/Company';
import JobList from './components/JobList';
import Job from './components/Job';
import UserProfile from './components/UserProfile';
import './styles/index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorElement />
  },
  {
    path: '/create-account',
    element: <NewUserForm />
  },
  {
    path: '/companies',
    element: <ProtectedRoute component={<CompanyList />} />,
    children: [
      {
        path: '',
        element: <DefaultMessage />
      },
      {
        path: ':handle',
        element: <ProtectedRoute component={<Company />} />
      }
    ]
  },
  {
    path: '/jobs',
    element: <ProtectedRoute component={<JobList />} />
  },
  {
    path: '/jobs/:id',
    element: <ProtectedRoute component={<Job />} />
  },
  {
    path: '/user-profile',
    element: <UserProfile />
  }
]);

const root = ReactDOMClient.createRoot(document.getElementById('root'));

ReactDOMClient.createRoot(root.render(<RouterProvider router={router} />));
