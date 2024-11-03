// src/components/Login/Login.js

import React, { useState, useContext } from "react";
import axios from "axios";
import { TextField, Button, Typography, Box } from "@mui/material";
import './Login.css';
import logo from '../../assets/images/logo.png';
import medicineImage from '../../assets/images/medicine2.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // Importar AuthContext

const Login = () => {
  const { login } = useContext(AuthContext); // Obter a função de login do contexto
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const loginSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted");

    setUserError(false);
    setPasswordError(false);

    let isValid = true;

    if (user === '') {
      setUserError(true);
      isValid = false;
    }
    if (password === '') {
      setPasswordError(true);
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await axios.post("http://localhost:8000/dev/login/", {
          username: user,
          password: password
        });
        login(response.data.token); // Atualizar o estado de autenticação
        alert("Login realizado com sucesso");
        navigate("/dashboard"); // Redirecionar para o dashboard
      } catch (error) {
        console.log(error);
        alert("Erro ao realizar login. Verifique suas credenciais.");
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