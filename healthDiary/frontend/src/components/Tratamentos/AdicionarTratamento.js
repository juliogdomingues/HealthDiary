// src/components/Tratamentos/AdicionarTratamento.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdicionarTratamento.css';
import { EventContext } from '../../context/EventContext'; // Importação correta

const AdicionarTratamento = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchEvents } = useContext(EventContext); // Uso correto do contexto

  // Obter a data e hora do estado passado via navegação
  const initialData = location.state?.data || new Date().toISOString().slice(0, 10); // Formato YYYY-MM-DD
  const initialHora = location.state?.hora || new Date().toTimeString().slice(0, 5); // Formato HH:MM

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [frequencia, setFrequencia] = useState('');
  const [data, setData] = useState(initialData);
  const [hora, setHora] = useState(initialHora);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //const dataHoraCriacao = `${data}T${hora}:00`;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        'http://localhost:8000/dev/tratamentos/',
        { title: titulo, description: descricao, frequency: frequencia },
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
        <Box mb={2}>
          <TextField
            label="Frequência"
            variant="outlined"
            color="secondary"
            fullWidth
            //type="date"
            required
            multiline
            rows={2}
            value={frequencia}
            onChange={(e) => setFrequencia(e.target.value)}
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
          {/* <TextField
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
          /> */}
        </Box>
        <Button variant="contained" color="secondary" type="submit">
          Adicionar Tratamento
        </Button>
      </form>
    </div>
  );
};

export default AdicionarTratamento;