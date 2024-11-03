// src/context/EventContext.js

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Cria o contexto
export const EventContext = createContext();

// Cria o provedor do contexto
export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log('EventProvider Rendered'); // Log para verificar se o provedor está sendo renderizado

  // Função para buscar eventos (sintomas e tratamentos) do backend
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Token de autenticação não encontrado. Faça login novamente.');
      }
      console.log('Token:', token); // Verificar se o token está correto

      const [sintomasResponse, tratamentosResponse] = await Promise.all([
        axios.get('http://localhost:8000/dev/sintomas/', {
          headers: { Authorization: `Token ${token}` },
        }),
        axios.get('http://localhost:8000/dev/tratamentos/', {
          headers: { Authorization: `Token ${token}` },
        }),
      ]);

      console.log('Resposta Sintomas:', sintomasResponse.data);
      console.log('Resposta Tratamentos:', tratamentosResponse.data);

      // Mapeia os sintomas para o formato esperado pelo FullCalendar
      const sintomas = sintomasResponse.data.map((sintoma) => {
        if (!sintoma.data_hora_criacao) {
          console.warn(`Sintoma com ID ${sintoma.id} não possui 'data_hora_criacao'.`);
          return null;
        }
        return {
          id: sintoma.id,
          title: sintoma.titulo,
          start: sintoma.data_hora_criacao,
          end: sintoma.data_hora_criacao,
          allDay: false,
          type: 'Sintoma',
        };
      }).filter(event => event !== null); // Remove os nulos

      // Mapeia os tratamentos para o formato esperado pelo FullCalendar
      const tratamentos = tratamentosResponse.data.map((tratamento) => {
        if (!tratamento.data_hora_criacao) {
          console.warn(`Tratamento com ID ${tratamento.id} não possui 'data_hora_criacao'.`);
          return null;
        }
        return {
          id: tratamento.id,
          title: tratamento.titulo,
          start: tratamento.data_hora_criacao,
          end: tratamento.data_hora_criacao,
          allDay: false,
          type: 'Tratamento',
        };
      }).filter(event => event !== null); // Remove os nulos

      console.log('Sintomas Mapeados:', sintomas);
      console.log('Tratamentos Mapeados:', tratamentos);

      // Atualiza o estado com os eventos combinados
      setEvents([...sintomas, ...tratamentos]);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados do calendário:', error);
      alert(`Erro ao carregar dados do calendário: ${error.message}`);
      setLoading(false);
    }
  };

  // Busca os eventos quando o provedor é montado
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, setEvents, fetchEvents, loading }}>
      {children}
    </EventContext.Provider>
  );
};