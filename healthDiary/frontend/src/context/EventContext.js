// src/context/EventContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { AuthContext } from './AuthContext';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const sintomasResponse = await axiosInstance.get('/dev/sintomas/');
  
      // Map symptoms to FullCalendar's expected format
      const sintomas = sintomasResponse.data.map((sintoma) => {
        if (!sintoma.date) {
          console.warn(`Sintoma com ID ${sintoma.id} não possui 'date'.`);
          return null;
        }
  
        // Convert the symptom date to UTC
        const date = new Date(sintoma.date);
        const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000); // Adjust to UTC
  
        return {
          id: sintoma.id,
          title: sintoma.title,  // Use the title as the event's name
          start: utcDate.toISOString(),  // Set start time as UTC ISO string
          end: utcDate.toISOString(),    // Set end time as UTC ISO string
          allDay: true,                  // Treat symptoms as all-day events
          type: 'Sintoma',
          extendedProps: {
            symptoms: [sintoma.title], // Store symptoms as an array
          },
        };
      }).filter(event => event !== null);
  
      // Update the state with the symptoms
      setEvents(sintomas);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar sintomas do calendário:', error);
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
