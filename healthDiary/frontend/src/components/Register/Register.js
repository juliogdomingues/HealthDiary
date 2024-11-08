// src/components/Register/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import './Register.css';
import logo from '../../assets/images/HealthMetrics.svg';
import registerImage from '../../assets/images/HealthMetrics.svg';
import { Link, useNavigate } from 'react-router-dom'; 

const Register = () => {
  const navigate = useNavigate(); // Inicializar o useNavigate
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const registerSubmit = (event) => {
    event.preventDefault();

    // Resetar erros
    setUsernameError(false);
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    let isValid = true;

    // Validação básica
    //if (first_name.trim() === '') {
    //  setFirstNameError(true);
    //  isValid = false;
    //}
    if (username.trim() === '') {
      setUsernameError(true);
      isValid = false;
    }
    if (last_name.trim() === '') {
      setLastNameError(true);
      isValid = false;
    }
    if (email.trim() === '') {
      setEmailError(true);
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      isValid = false;
    }
    if (password === '') {
      setPasswordError(true);
      isValid = false;
    }
    if (confirmPassword === '') {
      setConfirmPasswordError(true);
      isValid = false;
    }
    if (password !== confirmPassword) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      isValid = false;
      alert('As senhas não correspondem.');
    }

    if (isValid) {
      // Enviar dados para o backend
      axios.post('http://localhost:8000/dev/register/', {
        username: username,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      })
      .then(res => {
        alert('Cadastro realizado com sucesso! Faça login.');
        navigate('/login'); // Redirecionar para a página de login
      })
      .catch(error => {
        console.error(error);
        alert('Erro ao realizar o cadastro. Verifique os dados e tente novamente.');
      });
    }
  };

  return (
    <div className="register-container">
      <div className="left-side">
        <img src={registerImage} alt="Register" className="image" />
        <div className="text">
          <h1>Health Diary: Registre Sua Saúde</h1>
          <p>Crie sua conta e comece a monitorar sua saúde de forma eficaz.</p>
        </div>
      </div>
      <div className="right-side">
        <img src={logo} alt="Logo" className="logo" />
        <form autoComplete="off" onSubmit={registerSubmit} className="register-form">
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
            label="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            fullWidth
            value={first_name}
            error={firstNameError}
            helperText={firstNameError ? "Campo obrigatório" : ""}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="text"
            fullWidth
            value={last_name}
            error={lastNameError}
            helperText={lastNameError ? "Campo obrigatório" : ""}
            sx={{ mb: 3 }}
          />
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="email"
            fullWidth
            value={email}
            error={emailError}
            helperText={emailError ? "Email inválido" : ""}
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
          <TextField
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            variant="outlined"
            color="secondary"
            type="password"
            fullWidth
            value={confirmPassword}
            error={confirmPasswordError}
            helperText={confirmPasswordError ? "As senhas devem corresponder" : ""}
            sx={{ mb: 3 }}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Cadastrar
          </Button>
        </form>
        <div className="additional-options">
          <p>Já possui uma conta? <Link to="/login">Faça login</Link></p>
        </div>
        <div className="footer">
          <small>HEALTHDIARY © Todos os direitos reservados.</small>
          <a href="mailto:flgomide@gmail.com">Entre em contato</a>
        </div>
      </div>
    </div>
  );
};

export default Register;