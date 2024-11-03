// src/App.js

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Sintomas from './components/Sintomas/Sintomas';
import AdicionarSintoma from './components/Sintomas/AdicionarSintoma';
import EditarSintoma from './components/Sintomas/EditarSintoma';
import Tratamentos from './components/Tratamentos/Tratamentos';
import AdicionarTratamento from './components/Tratamentos/AdicionarTratamento';
import EditarTratamento from './components/Tratamentos/EditarTratamento';
import TestPage from './components/TestPage/TestPage';
import Logout from './components/Logout/Logout';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Rotas de Autenticação */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />

        {/* Rotas Protegidas */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/sintomas"
          element={isAuthenticated ? <Sintomas /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/sintomas/adicionar"
          element={isAuthenticated ? <AdicionarSintoma /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/sintomas/editar/:id"
          element={isAuthenticated ? <EditarSintoma /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/tratamentos"
          element={isAuthenticated ? <Tratamentos /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/tratamentos/adicionar"
          element={isAuthenticated ? <AdicionarTratamento /> : <Navigate to="/login" />}
        />
        <Route
          path="/dashboard/tratamentos/editar/:id"
          element={isAuthenticated ? <EditarTratamento /> : <Navigate to="/login" />}
        />
        <Route
          path="/test"
          element={isAuthenticated ? <TestPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/logout"
          element={isAuthenticated ? <Logout /> : <Navigate to="/login" />}
        />

        {/* Rota Padrão */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;