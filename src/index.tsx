import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { emailThunk } from './features/emails/emailSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(emailThunk(null));

root.render(
  <React.StrictMode>
    <Provider store={store}>
     <App />
    </Provider>
  </React.StrictMode>
);

// On the initial load the store.dispatch(emailThunk(null)) will be called [checkout the thunk funtion in the emailSlice.ts]

