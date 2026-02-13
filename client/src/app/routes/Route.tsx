import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import '../view/pages/HomePage';
import LoginPage from '../view/pages/LoginPage';
import RegisterPage from '../view/pages/RegisterPage';
import DashboardPage from '../view/pages/DashboardPage';
import ProtectedRoute from './ProtectedRoute';
import IndexRoute from './IndexRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <IndexRoute /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/main', element: <DashboardPage /> }, // should only be accessible when user is logged in
        ],
      },
    ],
  },
]);

export default function Root() {
  return <RouterProvider router={router} />;
}
