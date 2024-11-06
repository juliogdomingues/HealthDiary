// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';

// Importar e iniciar o worker
if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/browser');
  worker.start();
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <EventProvider> {/* Envolva com EventProvider se necessário */}
          <App />
        </EventProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);