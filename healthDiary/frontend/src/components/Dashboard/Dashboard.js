import React, { useContext } from 'react';
import { Button, Typography, Box } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { CSVLink } from 'react-csv';
import { EventContext } from '../../context/EventContext';
import Calendar from './Calendar';
import SideBar from './SideBar';
import './css/Dashboard.css';

const drawerWidth = 240;

const Dashboard = () => {
  const { events, loading, data } = useContext(EventContext);

  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Título', key: 'title' },
    { label: 'Descrição', key: 'description' },
    { label: 'Data da Ocorrência', key: 'date'},
    { label: 'Horário da Ocorrência', key: 'hour'}
  ];

  const csvReport = {
    data: data,
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
