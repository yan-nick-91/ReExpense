import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import LoginPage from '../view/pages/LoginPage';
import RegisterPage from '../view/pages/RegisterPage';
import DashboardPage from '../view/pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute';
import IndexRoute from './IndexRoute';
import SettingsPage from '../view/pages/SettingsPage';
import TransactionDetailPage from '../view/pages/TransactionDetailPage';
import ForgotPasswordPage from '../view/pages/ForgotPasswordPage';
import ResetPasswordPage from '../view/pages/ResetPasswordPage';
import GoalDetailPage from '../view/pages/GoalDetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <IndexRoute /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/forgot/password', element: <ForgotPasswordPage /> },
      { path: '/reset/password/:token', element: <ResetPasswordPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/', element: <DashboardPage /> },
          { path: '/settings', element: <SettingsPage /> },
          {
            path: '/transactions/:transactionId',
            element: <TransactionDetailPage />,
          },
          {
            path: '/goals/:goalId',
            element: <GoalDetailPage />
          }
        ],
      },
    ],
  },
]);

export default function Root() {
  return <RouterProvider router={router} />;
}
