import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import './LoginForm.css';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Configuração do interceptor do axios
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers['Authorization'] = 'Token ' + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const loginSubmit = (event) => {
    event.preventDefault();

    setUserError(false);
    setPasswordError(false);

    if (user === '') {
      setUserError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }

    if (user && password) {
      axios
        .post('http://localhost:8000/dev/login/', {
          username: user,
          password: password,
        })
        .then((res) => {
          localStorage.setItem('accessToken', res.data.token);
          alert('Login realizado com sucesso');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const AuthRequest = (event) => {
    event.preventDefault();
    console.log('Teste de auth');

    axios
      .get('http://localhost:8000/dev/auth_test/')
      .then((res) => {
        console.log(res.data.success);
        alert(res.data.success);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const LogoutRequest = (event) => {
    event.preventDefault();

    // TODO: IMPLEMENTAR REQUEST DE LOGOUT PARA DESCONECTAR USER NO BACKEND

    localStorage.clear();
    alert('Logout realizado com sucesso');
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <div className="text">
          <h1>Health Diary</h1>
          <p>Monitore seus sintomas.</p>
        </div>
      </div>
      <div className="right-side">
        <img src="logo192.png" alt="Logo" className="logo" />
        <form autoComplete="off" onSubmit={loginSubmit} className="login-form">
          <TextField
            label="Username"
            onChange={(e) => setUser(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            fullWidth
            value={user}
            error={userError}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            fullWidth
            value={password}
            error={passwordError}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>
        <div className="additional-options">
          <Button variant="outlined" color="secondary" onClick={AuthRequest} fullWidth>
            Testar autenticação
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={LogoutRequest}
            fullWidth
            style={{ marginTop: '10px' }}
          >
            Logout
          </Button>
        </div>
        <div className="footer">
          <small> © Todos os direitos reservados.</small>
          <a href="mailto:jgdjulio@gmail.com">Entre em contato</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
