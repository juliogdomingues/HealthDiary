// src/components/Tratamentos/EditarTratamento.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './EditarTratamento.css';
import { AuthContext } from '../../context/AuthContext';
import { EventContext } from '../../context/EventContext'; // Importação do EventContext

const EditarTratamento = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { fetchEvents } = useContext(EventContext); // Uso do EventContext
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const initialData = location.state?.data || new Date().toISOString().slice(0, 10);
  const initialHora = location.state?.hora || new Date().toTimeString().slice(0, 5);


  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState(initialData); // Initial date value
  const [hora, setHora] = useState(initialHora);
  const [intervalHours, setIntervalHours] = useState(12); // Valor padrão de 12 horas
  const [durationDays, setDurationDays] = useState(1); // Valor padrão de 1 dia
  const [isCompleted, setIsCompleted] = useState(false);
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
        setData(response.data.date);
        setHora(response.data.initial_hour);
        setIntervalHours(response.data.interal_hours);
        setDurationDays(response.data.duration_days);
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
        { 
          title: titulo, 
          description: descricao, 
          date: data, // Enviando a data
          initial_hour: hora, // Enviando a hora
          interval_hours: intervalHours, // Enviando o intervalo de horas
          duration_days: durationDays, // Enviando a duração em dias
          is_completed: isCompleted, // Enviando o estado 'is_completed'
        },
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
            color="secondary"
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
            color="secondary"
            fullWidth
            required
            multiline
            rows={4}
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            label="Data"
            variant="outlined"
            color="secondary"
            type="date"
            required
            value={data}
            onChange={(e) => setData(e.target.value)}
            sx={{ width: '48%' }}
          />
          <TextField
            label="Hora Inicial"
            variant="outlined"
            color="secondary"
            type="time"
            required
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            sx={{ width: '48%' }}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <TextField
            label="Intervalo (Horas)"
            variant="outlined"
            color="secondary"
            type="number"
            required
            value={intervalHours}
            onChange={(e) => setIntervalHours(e.target.value)}
            sx={{ width: '48%' }}
          />
          <TextField
            label="Duração (Dias)"
            variant="outlined"
            color="secondary"
            type="number"
            required
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
            sx={{ width: '48%' }}
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