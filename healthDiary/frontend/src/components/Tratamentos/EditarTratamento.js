// src/components/Tratamentos/EditarTratamento.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import './EditarTratamento.css';
import { AuthContext } from '../../context/AuthContext';
import { EventContext } from '../../context/EventContext'; // Importação do EventContext

const EditarTratamento = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { fetchEvents } = useContext(EventContext); // Uso do EventContext
  const navigate = useNavigate();
  const { id } = useParams();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar os dados do tratamento a ser editado
    const fetchTratamento = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:8000/dev/tratamentos/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setTitulo(response.data.title);
        setDescricao(response.data.description);
        setFrequencia(response.data.frequency);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar tratamento:', error);
        alert('Erro ao buscar tratamento. Tente novamente.');
        navigate('/dashboard/tratamentos');
      }
    };

    if (isAuthenticated) {
      fetchTratamento();
    }
  }, [isAuthenticated, id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(
        `http://localhost:8000/dev/tratamentos/${id}/`,
        { title: titulo, description: descricao, frequency: frequencia },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      alert('Tratamento atualizado com sucesso!');
      fetchEvents(); // Recarregar os eventos no calendário
      navigate('/dashboard/tratamentos'); // Redirecionar para Gerenciar Tratamentos
    } catch (error) {
      console.error('Erro ao atualizar tratamento:', error);
      alert('Erro ao atualizar tratamento. Verifique os dados e tente novamente.');
    }
  };

  if (loading) {
    return <Typography variant="h6" align="center">Carregando...</Typography>;
  }

  return (
    <div className="editar-tratamento-container">
      <Typography variant="h5" gutterBottom>
        Editar Tratamento
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Título"
            variant="outlined"
            fullWidth
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Descrição"
            variant="outlined"
            fullWidth
            required
            multiline
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Frequência"
            variant="outlined"
            fullWidth
            required
            value={frequencia}
            onChange={(e) => setFrequencia(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Button variant="contained" color="secondary" type="submit">
          Atualizar Tratamento
        </Button>
      </form>
    </div>
  );
};

export default EditarTratamento;