import React from 'react';
import ReactDOM from 'react-dom/client';
import { installBrowserExtensionErrorGuard } from './utils/browserExtensionErrorGuard';
import './i18n';
import './index.css';
import App from './App';

installBrowserExtensionErrorGuard();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
