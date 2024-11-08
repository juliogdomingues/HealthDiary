import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdicionarTratamento.css';
import { EventContext } from '../../context/EventContext';

const AdicionarTratamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchEvents } = useContext(EventContext);

  // Obter a data e hora do estado passado via navegação
  const initialData = location.state?.data || new Date().toISOString().slice(0, 10);
  const initialHora = location.state?.hora || new Date().toTimeString().slice(0, 5);

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState(initialData); // Initial date value
  const [hora, setHora] = useState(initialHora);
  const [intervalHours, setIntervalHours] = useState(12); // Valor padrão de 12 horas
  const [durationDays, setDurationDays] = useState(1); // Valor padrão de 1 dia

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        'http://localhost:8000/dev/tratamentos/',
        {
          title: titulo,
          description: descricao,
          date: data, // Include the date in the submission
          initial_hour: hora,
          interval_hours: intervalHours,
          duration_days: durationDays,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      alert('Tratamento adicionado com sucesso!');
      fetchEvents(); // Recarregar os eventos no calendário
      navigate('/dashboard'); // Redirecionar para o Dashboard
    } catch (error) {
      console.error('Erro ao adicionar tratamento:', error);
      alert('Erro ao adicionar tratamento. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="adicionar-tratamento-container">
      <Typography variant="h5" gutterBottom>
        Adicionar Novo Tratamento
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
      </form>

      {/* Box para os botões Voltar e Adicionar Tratamento */}
      <Box display="flex" justifyContent="space-between" mt={3}>
        {/* Botão Voltar */}
        <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>
          Voltar
        </Button>

        {/* Botão Adicionar Tratamento */}
        <Button variant="contained" color="secondary" onClick={handleSubmit}>
          Adicionar Tratamento
        </Button>
      </Box>
    </div>
  );
};

export default AdicionarTratamento;
