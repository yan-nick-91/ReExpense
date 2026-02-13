import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import DashboardPage from '../view/pages/DashboardPage';
import HomePage from '../view/pages/HomePage';

export default function IndexRoute() {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  return isAuthenticated ? <DashboardPage /> : <HomePage />;
}
