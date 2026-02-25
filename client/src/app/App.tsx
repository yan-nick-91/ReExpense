import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import type { AppDispatch } from './store/store';

import { isAuthenticated } from './api/authHttpHandler';
import NavBar from './view/components/NavBar';
import SkipLink from './view/UI/SkipLink';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(isAuthenticated());
  }, [dispatch]);

  return (
    <>
      <header>
        <SkipLink />
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
