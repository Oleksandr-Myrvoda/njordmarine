import './i18n';
import './styles/index.css';
import './styles/global.module.css';

import App from './components/App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { ErrorProvider } from 'context/ErrorProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </AuthProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
