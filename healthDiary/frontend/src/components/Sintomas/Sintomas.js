import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Typography, Box, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './Sintomas.css';
import { AuthContext } from '../../context/AuthContext';
import { EventContext } from '../../context/EventContext'; // Importação do EventContext
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Sintomas = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { fetchEvents } = useContext(EventContext); // Uso do EventContext
  const [sintomas, setSintomas] = useState([]);
  const navigate = useNavigate();  // Hook de navegação

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

        {/* Caixa para alinhar os botões lado a lado */}
        <Box display="flex" gap={2}>
          {/* Botão Voltar */}
          <Button variant="outlined" color="secondary" onClick={() => navigate('/dashboard')}>
            Voltar
          </Button>

          {/* Botão Adicionar Sintoma */}
          <Link to="/dashboard/sintomas/adicionar" className="link">
            <Button variant="contained" color="primary">
              Adicionar Sintoma
            </Button>
          </Link>
        </Box>
      </Box>

      <List>
        {sintomas.map((sintoma) => (
          <ListItem key={sintoma.id} divider>
            <ListItemText
              primary={sintoma.title}
              secondary={
                <>
                  <div>{sintoma.description}</div>
                  <div>Data: {sintoma.date.split("T")[0]} </div>
                  <div>Hora: {sintoma.date.split("T")[1].slice(0, 5)} </div>
                </>
              } 
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
