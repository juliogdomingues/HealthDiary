// src/components/Login/Login.js

import React, { useState, useContext } from "react";
import axiosInstance from '../../utils/axiosConfig'; // Importar a instância do Axios configurada
import { TextField, Button, Typography, Box } from "@mui/material";
import './Login.css';
import logo from '../../assets/images/HealthMetrics.svg';
import medicineImage from '../../assets/images/HealthMetrics.svg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Importar AuthContext

const Login = () => {
  const { login } = useContext(AuthContext); // Obter a função de login do contexto
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const loginSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted");

    setUsernameError(false);
    setPasswordError(false);

    let isValid = true;

    if (username.trim() === '') {
      setUsernameError(true);
      isValid = false;
    }
    if (password.trim() === '') {
      setPasswordError(true);
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await axiosInstance.post("/dev/login/", {
          username: username,
          password: password
        });

        // Verifique a resposta do backend
        console.log("Login Response:", response.data);

        const receivedToken = response.data.token;

        if (receivedToken) {
          login(receivedToken); // Atualizar o estado de autenticação
          alert("Login realizado com sucesso");
          navigate("/dashboard"); // Redirecionar para o dashboard
        } else {
          alert("Erro: Token não recebido.");
        }
      } catch (error) {
        console.log("Login Error:", error.response); // Log detalhado do erro
        if (error.response && error.response.data) {
          alert(`Erro: ${error.response.data.error || 'Verifique suas credenciais.'}`);
        } else {
          alert("Erro ao realizar login. Tente novamente.");
        }
      }
    }
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
            onChange={(e) => setUsername(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            fullWidth
            value={username}
            error={usernameError}
            helperText={usernameError ? "Campo obrigatório" : ""}
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
          <p>Não possui uma conta? <Link to="/register">Cadastre-se</Link></p>
        </div>
        <div className="footer">
          <small>HEALTHDIARY © Todos os direitos reservados.</small>
          <a href="mailto:flgomide@gmail.com">Entre em contato</a>
        </div>
      </div>
    </div>
  );
};

export default Login;