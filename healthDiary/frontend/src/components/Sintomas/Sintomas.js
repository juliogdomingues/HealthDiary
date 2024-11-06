// src/components/Sintomas/Sintomas.js

import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Typography, Box, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import './Sintomas.css';
import { AuthContext } from '../../context/AuthContext';
import { EventContext } from '../../context/EventContext'; // Importação do EventContext
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Sintomas = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { fetchEvents } = useContext(EventContext); // Uso do EventContext
  const [sintomas, setSintomas] = useState([]);

  useEffect(() => {
    // Função para buscar sintomas do backend
    const fetchSintomas = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/dev/sintomas/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setSintomas(response.data);
      } catch (error) {
        console.error('Erro ao buscar sintomas:', error);
      }
    };

    if (isAuthenticated) {
      fetchSintomas();
    }
  }, [isAuthenticated]);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:8000/dev/sintomas/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSintomas(sintomas.filter(sintoma => sintoma.id !== id));
      fetchEvents(); // Recarregar os eventos no calendário
      alert('Sintoma excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir sintoma:', error);
      alert('Erro ao excluir sintoma. Tente novamente.');
    }
  };

  return (
    <div className="sintomas-container">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Meus Sintomas</Typography>
        <Link to="/dashboard/sintomas/adicionar" className="link">
          <Button variant="contained" color="primary">
            Adicionar Sintoma
          </Button>
        </Link>
      </Box>
      <List>
        {sintomas.map((sintoma) => (
          <ListItem key={sintoma.id} divider>
            <ListItemText
              primary={sintoma.title}
              secondary={sintoma.description}
            />
            <IconButton component={Link} to={`/dashboard/sintomas/editar/${sintoma.id}`} color="primary">
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(sintoma.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sintomas;