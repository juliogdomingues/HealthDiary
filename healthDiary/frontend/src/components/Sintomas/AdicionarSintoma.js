// src/components/Sintomas/AdicionarSintoma.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdicionarSintoma.css';
import { EventContext } from '../../context/EventContext'; // Importação correta

const AdicionarSintoma = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchEvents } = useContext(EventContext); // Uso correto do contexto

  // Obter a data e hora do estado passado via navegação
  const initialData = location.state?.data || new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
  const initialHora = location.state?.hora || new Date().toTimeString().slice(0, 5); // Formato HH:MM

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState(initialData);
  const [hora, setHora] = useState(initialHora);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataHoraCriacao = `${data}T${hora}:00`;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        'http://localhost:8000/dev/sintomas/',
        { titulo, descricao, data_hora_criacao: dataHoraCriacao },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      alert('Sintoma adicionado com sucesso!');
      fetchEvents(); // Recarregar os eventos no calendário
      navigate('/dashboard'); // Redirecionar para o Dashboard
    } catch (error) {
      console.error('Erro ao adicionar sintoma:', error);
      alert('Erro ao adicionar sintoma. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="adicionar-sintoma-container">
      <Typography variant="h5" gutterBottom>
        Adicionar Novo Sintoma
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
        <Box mb={2} display="flex" justifyContent="space-between">
          <TextField
            label="Data"
            variant="outlined"
            type="date"
            required
            value={data}
            onChange={(e) => setData(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '48%' }}
          />
          <TextField
            label="Hora"
            variant="outlined"
            type="time"
            required
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: '48%' }}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Adicionar Sintoma
        </Button>
      </form>
    </div>
  );
};

export default AdicionarSintoma;