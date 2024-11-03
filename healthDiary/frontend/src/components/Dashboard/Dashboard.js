// src/components/Dashboard/Dashboard.js

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HealingIcon from '@mui/icons-material/Healing';
import GetAppIcon from '@mui/icons-material/GetApp';
import './Dashboard.css';
import logo from '../../assets/images/logo.png';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CSVLink } from 'react-csv';
import { EventContext } from '../../context/EventContext'; // Importação correta

const drawerWidth = 240;

const Dashboard = () => {
  const { events, loading } = useContext(EventContext); // Uso do contexto
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Handler para quando uma data no calendário é clicada
  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr; // Formato: 'YYYY-MM-DD'
    const clickedTime = arg.date.toTimeString().slice(0, 5); // Formato: 'HH:MM'

    navigate('/dashboard/sintomas/adicionar', { state: { data: clickedDate, hora: clickedTime } });
  };

  // Preparar dados para exportação CSV
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

  const drawer = (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center" p={2}>
        <img src={logo} alt="Logo" className="dashboard-logo" />
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/dashboard/sintomas" onClick={() => isMobile && handleDrawerToggle()}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Gerenciar Sintomas" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/tratamentos" onClick={() => isMobile && handleDrawerToggle()}>
          <ListItemIcon>
            <HealingIcon />
          </ListItemIcon>
          <ListItemText primary="Gerenciar Tratamentos" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText primary={<CSVLink {...csvReport} style={{ textDecoration: 'none', color: 'inherit' }}>Exportar CSV</CSVLink>} />
        </ListItem>
        <ListItem button component={Link} to="/logout" onClick={() => isMobile && handleDrawerToggle()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6">Carregando...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex' }}>
      {/* AppBar para dispositivos móveis */}
      {isMobile && (
        <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {/* Drawer para dispositivos móveis e permanentes para desktops */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="sidebar"
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Melhor performance em dispositivos móveis
          }}
          sx={{
            display: { xs: 'block', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: isMobile ? '64px' : '0', // Ajusta a margem superior para dispositivos móveis
        }}
      >
        {/* Exportar CSV no topo para desktop */}
        {!isMobile && (
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <CSVLink {...csvReport} style={{ textDecoration: 'none' }}>
              <Button variant="outlined" color="success" startIcon={<GetAppIcon />}>
                Exportar CSV
              </Button>
            </CSVLink>
          </Box>
        )}

        {/* Calendário */}
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          eventColor="#378006"
          eventContent={(eventInfo) => (
            <div>
              <strong>{eventInfo.event.title}</strong>
              <div>{eventInfo.event.extendedProps.type}</div>
            </div>
          )}
          height="auto"
        />
      </Box>
    </Box>
  );
};

export default Dashboard;