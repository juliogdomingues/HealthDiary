// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext'; // Importe o EventProvider
import './index.css';

// Importar e iniciar o worker
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <EventProvider> {/* Envolva o App com o EventProvider */}
        <App />
      </EventProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);