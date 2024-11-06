// src/context/EventContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { AuthContext } from './AuthContext';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para buscar eventos (sintomas e tratamentos) do backend
  const fetchEvents = async () => {
    try {
      const [sintomasResponse, tratamentosResponse] = await Promise.all([
        axiosInstance.get('/dev/sintomas/'),
        axiosInstance.get('/dev/tratamentos/'),
      ]);

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
      }).filter(event => event !== null);

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
      }).filter(event => event !== null);

      // Atualiza o estado com os eventos combinados
      setEvents([...sintomas, ...tratamentos]);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar dados do calendário:', error);
      alert(`Erro ao carregar dados do calendário: ${error.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEvents();
    } else {
      setEvents([]);
      setLoading(false);
    }
  }, [isAuthenticated]);

  return (
    <EventContext.Provider value={{ events, setEvents, fetchEvents, loading }}>
      {children}
    </EventContext.Provider>
  );
};