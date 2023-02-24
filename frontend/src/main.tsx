import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ErrorRoute from './routes/errorRoute';
import Profile from './routes/profile/Profile';
import MySubs from './routes/mysubs/MySubs';
import Users from './routes/mysubs/users/Users';
import Requests from './routes/mysubs/requests/Requests';
import Home from './routes/home/Home';
import SubPost from './routes/home/SubPost/SubPost';
import Reports from './routes/mysubs/reports/Reports';
import SavedPosts from './routes/savedposts/SavedPosts';
import './index.css';
import Stats from './routes/mysubs/stats/Stats';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorRoute />
  },
  {
    path: '/home',
    element: <Home />,
    errorElement: <ErrorRoute />
  },
  {
    path: '/profile',
    element: <Profile />,
    errorElement: <ErrorRoute />
  },
  {
    path: '/saved',
    element: <SavedPosts />,
    errorElement: <ErrorRoute />
  },
  {
    path: '/mysubs',
    element: <MySubs />,
    errorElement: <ErrorRoute />
  },
  {
    path: '/mysubs/:id/users',
    element: <Users />,
    errorElement: <ErrorRoute />
  },
  {
    path: '/mysubs/:id/requests',
    element: <Requests />,
    errorElement: <ErrorRoute />
  },
  {
    path: '/mysubs/:id/reports',
    element: <Reports />,
    errorElement: <ErrorRoute />
  },
  {
    path: '/mysubs/:id/stats',
    element: <Stats />,
    errorElement: <ErrorRoute />
  },
  {
    path: '/home/:subId',
    element: <SubPost />,
    errorElement: <ErrorRoute />
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
