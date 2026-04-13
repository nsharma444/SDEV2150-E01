import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

import App from './App.jsx';
import ResourceDirectoryPage from './pages/ResourceDirectoryPage';
import AdminPage from './pages/AdminPage';

import './index.css';

const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: App,
      children: [
        {index: true, Component: ResourceDirectoryPage},
        {path: "admin", Component: AdminPage},
        {path: "admin/:resourceId", Component: AdminPage}
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
