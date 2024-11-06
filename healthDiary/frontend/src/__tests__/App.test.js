// src/__tests__/App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { AuthContext } from '../context/AuthContext';

describe('Testes de rotas protegidas e redirecionamentos', () => {
  test('Redireciona para login ao acessar rota protegida sem autenticação', async () => {
    const authContextValue = {
      isAuthenticated: false,
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Aguarda o redirecionamento e verifica se a página de login está sendo exibida
    const loginHeading = await screen.findByRole('heading', { name: /login/i });
    expect(loginHeading).toBeInTheDocument();
  });

  test('Permite acesso a rota protegida quando autenticado', async () => {
    const authContextValue = {
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Aguarda o dashboard ser exibido
    const dashboardHeading = await screen.findByText(/bem-vindo ao health diary/i);
    expect(dashboardHeading).toBeInTheDocument();
  });

  test('Redireciona para dashboard ao acessar login quando autenticado', async () => {
    const authContextValue = {
      isAuthenticated: true,
      login: jest.fn(),
      logout: jest.fn(),
    };

    render(
      <AuthContext.Provider value={authContextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // Aguarda o redirecionamento para o dashboard
    const dashboardHeading = await screen.findByText(/bem-vindo ao health diary/i);
    expect(dashboardHeading).toBeInTheDocument();
  });
});