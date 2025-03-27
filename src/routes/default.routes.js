/*import LoginPage from '../pages/SuperAdmin/Auth/Login';
import DashboardPage from '../pages/SuperAdmin/Dashboard';

const prefix = "/super-admin";
export const superAdminRoutes = [
  {
    path: prefix + "/login",
    name: "login",
    component: <LoginPage />
  },
  {
    path: prefix + "/dashboard",
    name: "login",
    component: <DashboardPage />
  }
];*/

import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const HomeContainer = Loadable(lazy(() => import('../pages/Home')));

const DefaultRoutes = (isLoggedIn) => [{
  path: '/',
  element: <HomeContainer />
}];

export default DefaultRoutes;