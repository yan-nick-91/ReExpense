import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useSelector(
    (state: RootState) => state.auth,
  );

  const location = useLocation();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to='/' replace state={{ from: location }} />;
  }

  return <Outlet />;
}
