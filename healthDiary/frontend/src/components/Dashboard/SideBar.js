import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HealingIcon from '@mui/icons-material/Healing';
import GetAppIcon from '@mui/icons-material/GetApp';
import { CSVLink } from 'react-csv';
import logo from '../../assets/images/logo.png';
import './Dashboard.css';

const SideBar = ({ csvReport, drawerWidth }) => {
  const drawer = (
    <div>
      <Box className="logo-container">
        <img src={logo} alt="Logo" className="dashboard-logo" />
      </Box>
      <Divider />
      <List>
        <ListItem button component={Link} to="/dashboard/sintomas">
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Gerenciar Sintomas" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/tratamentos">
          <ListItemIcon>
            <HealingIcon />
          </ListItemIcon>
          <ListItemText primary="Gerenciar Tratamentos" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <CSVLink {...csvReport} className="csv-link">
                Exportar CSV
              </CSVLink>
            }
          />
        </ListItem>
        <ListItem button component={Link} to="/logout">
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Drawer
      variant="permanent"
      open
      className="drawer-paper"
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default SideBar;
