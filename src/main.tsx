
import "./index.css";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);