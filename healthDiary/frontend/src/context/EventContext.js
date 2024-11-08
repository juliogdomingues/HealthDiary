// src/context/EventContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import axiosInstance from '../utils/axiosConfig';
import { AuthContext } from './AuthContext';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  // src/context/EventContext.js

  const fetchEvents = async () => {
    try {
      const sintomasResponse = await axiosInstance.get('/dev/sintomas/');
      const sintomasData = sintomasResponse.data;
      


      const processado = Object.entries(sintomasData).map(([idx, symptoms]) => {
        const [date, time] = symptoms.date.split("T");
        const hour = time.slice(0, 5);

        return {
          ...symptoms,
          date,
          hour
        };
      });

      //console.log(processado)
      setData(processado)

      // Group symptoms by date
      const groupedByDate = sintomasData.reduce((acc, sintoma) => {
        if (!sintoma.date) {
          console.warn(`Sintoma com ID ${sintoma.id} não possui 'date'.`);
          return acc;
        }
  
        const date = new Date(sintoma.date);
        const localDateStr = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()).toISOString().split('T')[0];
        
        if (!acc[localDateStr]) acc[localDateStr] = [];
        
        // Add each symptom title or fallback to sintoma.title
        acc[localDateStr].push(sintoma.title);
        return acc;
      }, {});
  
      // Map the grouped data into events, applying symptom limits
      var objects = Object.entries(groupedByDate).map(([date, symptoms]) => {
        const limitedSymptoms = symptoms.slice(0, 4);
        const moreCount = symptoms.length > 4 ? symptoms.length - 4 : 0;
  
        return {
          id: `event-${date}`,        // Unique identifier for each date's events
          title: `Symptoms for ${date}`,
          start: date,                // Date string in 'YYYY-MM-DD' format
          end: date,
          allDay: true,
          extendedProps: {
            symptoms: limitedSymptoms, // Limited symptoms for display
            moreCount,                 // Remaining count if > 5 symptoms
          },
        };
      });
  
      setEvents(objects);
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
    <EventContext.Provider value={{ events, setEvents, fetchEvents, loading, data }}>
      {children}
    </EventContext.Provider>
  );
};
