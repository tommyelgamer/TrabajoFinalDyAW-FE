import React, { Profiler } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MerchandisePage from './pages/MerchandisePage';
import IndexPage from './pages/IndexPage';
import Layout from './pages/Layout';
import LogoutPage from './pages/LogoutPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CreateMerchandisePage from './pages/CreateMerchandisePage';
import EditMerchadisePage from './pages/EditMerchandisePage';
import UserPage from './pages/UserPage';
import CreateUserPage from './pages/CreateUserPage';
import UpdateUserPage from './pages/UpdateUserPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <IndexPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/logout',
        element: <LogoutPage />
      },
      {
        path: '/merchandise',
        children: [
          {
            path: '/merchandise',
            element: <MerchandisePage />
          },
          {
            path: '/merchandise/new',
            element: <CreateMerchandisePage />
          },
          {
            path: '/merchandise/edit/:id',
            element: <EditMerchadisePage />
          }
        ]
      },
      {
        path: '/user',
        children: [
          {
            path: '/user',
            element: <UserPage />
          },
          {
            path: '/user/new',
            element: <CreateUserPage />
          },
          {
            path: '/user/edit/:id',
            element: <UpdateUserPage />
          },
        ]
      }
    ]
  },
  {
    path: '*',
    element: <Navigate replace to="/merchandise" />
  }
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
