import { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

const LoginPage = Loadable(lazy(() => import('../pages/Team/Auth/Login')));
const ForgotPasswordPage = Loadable(lazy(() => import('../pages/Team/Auth/ForgotPassword')));
const ResetPasswordPage = Loadable(lazy(() => import('../pages/Team/Auth/ResetPassword')));

const TeamRoutes = (isLoggedIn) => [
    {
        path: `/login`,
        element: <LoginPage />,
    },
    {
        path: `/forgot-password`,
        element: <ForgotPasswordPage />,
      },
    {
        path: `/reset-password`,
        element: <ResetPasswordPage />,
      }
];

export default TeamRoutes;