import './i18n';
import './styles/index.css';
import './styles/global.module.css';

import App from './components/App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { ErrorProvider } from 'context/ErrorProvider';
import React from 'react';
import ReactDOM from 'react-dom/client';
import GeneralApp from 'components/GeneralApp/GeneralApp';
import { ImageLoadingProvider } from 'context/ImageLoaderProvider';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <ErrorProvider>
        <ImageLoadingProvider>
          <GeneralApp />
          {/* <App /> */}
        </ImageLoadingProvider>
      </ErrorProvider>
    </AuthProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
