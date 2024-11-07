// src/components/Tratamentos/Tratamentos.js

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Typography, Box, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import './Tratamentos.css';
import { AuthContext } from '../../context/AuthContext';
import { EventContext } from '../../context/EventContext'; // Importação do EventContext
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Tratamentos = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { fetchEvents } = useContext(EventContext); // Uso do EventContext
  const [tratamentos, setTratamentos] = useState([]);

  useEffect(() => {
    // Função para buscar tratamentos do backend
    const fetchTratamentos = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/dev/tratamentos/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setTratamentos(response.data);
      } catch (error) {
        console.error('Erro ao buscar tratamentos:', error);
      }
    };

    if (isAuthenticated) {
      fetchTratamentos();
    }
  }, [isAuthenticated]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:8000/dev/tratamentos/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setTratamentos(tratamentos.filter(tratamento => tratamento.id !== id));
      fetchEvents(); // Recarregar os eventos no calendário
      alert('Tratamento excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir tratamento:', error);
      alert('Erro ao excluir tratamento. Tente novamente.');
    }
  };

  return (
    <div className="tratamentos-container">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Meus Tratamentos</Typography>
        <Link to="/dashboard/tratamentos/adicionar" className="link">
          <Button variant="contained" color="secondary">
            Adicionar Tratamento
          </Button>
        </Link>
      </Box>
      <List>
        {tratamentos.map((tratamento) => (
          <ListItem key={tratamento.id} divider>
            <ListItemText
              primary={tratamento.title}
              secondary={tratamento.description }
            />
            <IconButton component={Link} to={`/dashboard/tratamentos/editar/${tratamento.id}`} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(tratamento.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Tratamentos;