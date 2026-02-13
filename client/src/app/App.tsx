import { Outlet } from 'react-router-dom';
import NavBar from './view/components/NavBar';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store/store';
import { useEffect } from 'react';
import { isAuthenticated } from './api/authHttpHandler';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(isAuthenticated());
  }, [dispatch]);

  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
