import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

try {
  const pending = sessionStorage.getItem('nexas_redirect');
  if (pending && pending !== '/' && pending !== '/index.html') {
    sessionStorage.removeItem('nexas_redirect');
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      window.history.replaceState(null, '', pending);
    }
  }
} catch { /* storage blocked */ }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
