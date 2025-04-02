import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const LoginPage = Loadable(lazy(() => import('../pages/Team/Auth/Login')));
const ForgotPasswordPage = Loadable(lazy(() => import('../pages/Team/Auth/ForgotPassword')));

const TeamRoutes = (isLoggedIn) => [
    {
        path: `/login`,
        element: <LoginPage />,
    },
    {
        path: `/forgot-password`,
        element: <ForgotPasswordPage />,
      }
];

export default TeamRoutes;