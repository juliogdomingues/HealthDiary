// src/components/Logout/Logout.js

import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    alert('Logout realizado com sucesso');
    navigate('/login');
  }, [logout, navigate]);

  return null;
};

export default Logout;