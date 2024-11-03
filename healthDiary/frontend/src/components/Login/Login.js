// src/components/Login/Login.js

import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@mui/material";
import './Login.css';
import logo from '../../assets/images/logo.png'; 
import medicineImage from '../../assets/images/medicine2.png'; 
import { Link } from 'react-router-dom'; // Importar Link para navegação

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Configuração do interceptor do axios
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
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
    console.log("Submitted");

    setUserError(false);
    setPasswordError(false);

    if (user === '') {
      setUserError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }

    if (user && password) {
      axios.post("http://localhost:8000/dev/login/", {
        username: user,
        password: password
      })
      .then(res => {
        localStorage.setItem("accessToken", res.data.token);
        alert("Login realizado com sucesso");
        // Redirecionar para a página principal ou dashboard
      })
      .catch(error => {
        console.log(error);
        alert("Erro ao realizar login. Verifique suas credenciais.");
      });
    }
  };

  const AuthRequest = (event) => {
    event.preventDefault();
    console.log("Teste de auth");

    axios.get("http://localhost:8000/dev/auth_test/")
    .then(res => {
      console.log(res.data.success);
      alert(res.data.success);
    })
    .catch(error => {
      console.log(error);
      alert("Erro na autenticação");
    });
  };

  const LogoutRequest = (event) => {
    event.preventDefault();
    
    // TODO: IMPLEMENTAR REQUEST DE LOGOUT PARA DESCONECTAR USER NO BACKEND

    localStorage.clear();
    alert("Logout realizado com sucesso");
  };

  return (
    <div className="login-container">
      <div className="left-side">
        <img src={medicineImage} alt="Medicine" className="image" />
        <div className="text">
          <h1>Health Diary: Seu Diário de Saúde</h1>
          <p>Monitore seus sintomas, facilite seu diagnóstico.</p>
        </div>
      </div>
      <div className="right-side">
        <img src={logo} alt="Logo" className="logo" />
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
            helperText={userError ? "Campo obrigatório" : ""}
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
            helperText={passwordError ? "Campo obrigatório" : ""}
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
        <div className="additional-options">
          <p>Não possui uma conta? <Link to="/register">Cadastre-se</Link></p>
        </div>
        <div className="footer">
          <small>SPECTRUS © Todos os direitos reservados.</small>
          <a href="mailto:spectrusltda@gmail.com">Entre em contato</a>
        </div>
      </div>
    </div>
  );
};

export default Login;