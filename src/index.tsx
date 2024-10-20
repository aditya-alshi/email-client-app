import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { fetchAllEmails, fetchEmailById } from './features/emails/emailAPI';
import { emailThunk } from './features/emails/emailSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(emailThunk(1));
// Use Redux Provider

root.render(
  <React.StrictMode>
    <Provider store={store}>
     <App />
    </Provider>
  </React.StrictMode>
);


