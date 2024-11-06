// src/components/TestPage/TestPage.js

import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './TestPage.css';
import logo from '../../assets/images/logo.png'; // Certifique-se de que o caminho está correto

const TestPage = () => {
  return (
    <div className="test-page-container">
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <img src={logo} alt="Logo" className="test-page-logo" />
        <Typography variant="h4" gutterBottom>
          Test Page
        </Typography>
        <Typography variant="body1" gutterBottom>
          Esta é a página de teste. Se você está vendo esta página, a rota está funcionando corretamente!
        </Typography>
        <Link to="/dashboard" className="link">
          <Button variant="contained" color="primary">
            Voltar para Dashboard
          </Button>
        </Link>
      </Box>
    </div>
  );
};

export default TestPage;