import React from 'react';
import './App.scss';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from 'components/root/root';
import ErrorPage from 'error-page';
import { AuthPage } from 'pages/auth-page';
import { UsersDashboardPage } from 'pages/users-dashboard-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: `/auth`,
        element: <AuthPage />,
      },
      {
        path: '/users-dashboard',
        element: <UsersDashboardPage />,
      },
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
