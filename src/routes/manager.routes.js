import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';

const LoginPage = Loadable(lazy(() => import('../pages/Manager/Auth/Login')));
const DashboardPage = Loadable(lazy(() => import('../pages/Manager/Dashboard')));

// worker
const WorkerPage = Loadable(lazy(() => import('../pages/Manager/Worker')));
const WorkerCreatePage = Loadable(lazy(() => import('../pages/Manager/Worker/Create')));
const WorkerEditPage = Loadable(lazy(() => import('../pages/Manager/Worker/Edit')));

// StockHistoryPage
const StockHistoryPage = Loadable(lazy(() => import('../pages/Manager/StockHistory')));
const StockHistoryCreatePage = Loadable(lazy(() => import('../pages/Manager/StockHistory/Create')));
const StockHistoryEditPage = Loadable(lazy(() => import('../pages/Manager/StockHistory/Edit')));

const routePrefix = '/manager';
const ManagerRoutes = (isLoggedIn) => [
  {
    path: routePrefix,
    element: isLoggedIn ? <MainLayout /> : <Navigate to={`${routePrefix}/login`} />,
    children: [
      {
        path: routePrefix,
        element: <DashboardPage />
      },
      {
        path: 'dashboard',
        element: <DashboardPage />
      },
      {
        path: 'workers',
        element: <WorkerPage />
      },
      {
        path: 'workers/Create',
        element: <WorkerCreatePage />
      },
      {
        path: 'workers/Edit/:id',
        element: <WorkerEditPage />
      },
      {
        path: 'stock-histories',
        element: <StockHistoryPage />
      },
      {
        path: 'stock-histories/Create',
        element: <StockHistoryCreatePage />
      },
      {
        path: 'stock-histories/Edit/:id',
        element: <StockHistoryEditPage />
      },
    ]
  },
  {
    path: `${routePrefix}/login`,
    element: <LoginPage />,
  }
];

export default ManagerRoutes;