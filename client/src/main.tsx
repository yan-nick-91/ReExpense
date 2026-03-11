import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import './app/styles.css';
import Root from './app/routes/Route.tsx';
import { store } from './app/store/store.ts';
import { StrictMode } from 'react';
import SkipLinkProvider from './app/context/SkipLinkProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <SkipLinkProvider>
        <Root />
      </SkipLinkProvider>
    </Provider>
  </StrictMode>,
);
