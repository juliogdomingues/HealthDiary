import React, { useContext } from 'react';
import { Button, Typography, Box } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { CSVLink } from 'react-csv';
import { EventContext } from '../../context/EventContext';
import Calendar from './Calendar';
import SideBar from './SideBar';
import './Dashboard.css';

const drawerWidth = 240;

const Dashboard = () => {
  const { events, loading } = useContext(EventContext);

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Título', key: 'title' },
    { label: 'Data e Hora de Início', key: 'start' },
    { label: 'Data e Hora de Término', key: 'end' },
    { label: 'Tipo', key: 'type' },
  ];

  const csvReport = {
    data: events,
    headers: headers,
    filename: 'Sintomas_e_Tratamentos.csv',
  };

  if (loading) {
    return (
      <Box className="loading-container">
        <Typography variant="h6">Carregando...</Typography>
      </Box>
    );
  }

  return (
    <Box className="dashboard-container">
      <Box component="nav" className="sidebar-container" aria-label="sidebar">
        <SideBar csvReport={csvReport} drawerWidth={drawerWidth} />
      </Box>

      <Box component="main" className="main-content">
        <Calendar events={events} />
      </Box>
    </Box>
  );
};

export default Dashboard;
