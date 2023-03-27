import React from 'react';

import { GoogleOAuthProvider } from '@react-oauth/google';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';

import reportWebVitals from './reportWebVitals';

import App from 'components/App/App';
import { store } from 'store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <Provider store={store}>
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLOUD_CLIENT_ID as string}
    >
      <App />
    </GoogleOAuthProvider>
  </Provider>,
);
reportWebVitals();
