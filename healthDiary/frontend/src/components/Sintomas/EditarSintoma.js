// src/components/Sintomas/EditarSintoma.js

import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import './EditarSintoma.css';
import { AuthContext } from '../../context/AuthContext';
import { EventContext } from '../../context/EventContext'; // Importação do EventContext

const EditarSintoma = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { fetchEvents } = useContext(EventContext); // Uso do EventContext
  const navigate = useNavigate();
  const { id } = useParams();

  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar os dados do sintoma a ser editado
    const fetchSintoma = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:8000/dev/sintomas/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const { titulo, descricao, data_hora_criacao } = response.data;
        const [dataParte, horaParte] = data_hora_criacao.split('T');
        setTitulo(titulo);
        setDescricao(descricao);
        setData(dataParte);
        setHora(horaParte.slice(0,5)); // Extrai HH:MM
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar sintoma:', error);
        alert('Erro ao buscar sintoma. Tente novamente.');
        navigate('/dashboard/sintomas');
      }
    };

    if (isAuthenticated) {
      fetchSintoma();
    }
  }, [isAuthenticated, id, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataHoraAtualizada = `${data}T${hora}:00`;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(
        `http://localhost:8000/dev/sintomas/${id}/`,
        { titulo, descricao, data_hora_criacao: dataHoraAtualizada },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      alert('Sintoma atualizado com sucesso!');
      fetchEvents(); // Recarregar os eventos no calendário
      navigate('/dashboard/sintomas');
    } catch (error) {
      console.error('Erro ao atualizar sintoma:', error);
      alert('Erro ao atualizar sintoma. Verifique os dados e tente novamente.');
    }
  };

  if (loading) {
    return <Typography variant="h6" align="center">Carregando...</Typography>;
  }

  return (
    <div className="editar-sintoma-container">
      <Typography variant="h5" gutterBottom>
        Editar Sintoma
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
          Atualizar Sintoma
        </Button>
      </form>
    </div>
  );
};

export default EditarSintoma;