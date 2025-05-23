import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import './SidebarMenu.css';

function SidebarMenu() {
  const location = useLocation();

  const menuItems = [
    { 
      text: 'Catálogo de Eventos',
      icon: <EventNoteIcon />,
      path: '/client/catalog'
    },
    { 
      text: 'Eventos Programados',
      icon: <CalendarMonthIcon />,
      path: '/client/schedule'
    },
    {
      text: 'Cerrar Sesión',
      icon: <LogoutIcon />,
      path: '/login'
    }
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: 'transparent',
      }}
    >
      <Box
        sx={{
          width: 240, // Ancho del sidebar
          height: '100vh', // Ocupa toda la altura
          backgroundColor: '#f0f0f0', // Un color de fondo simple
          padding: '16px', // Espaciado interno
          borderRight: '1px solid #e0e0e0', // Un borde a la derecha
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: '20px', textAlign: 'center' }}>
          Ricardo's Events 🗓️
        </Typography>
        <List sx={{ p: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'inherit',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(59, 130, 246, 0.08)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: location.pathname === item.path ? 'inherit' : 'primary.main',
                  }}
                >
                  {item.icon}
                </ListItemIcon>              <ListItemText>
                <span style={{ 
                  fontSize: '0.875rem',
                  fontWeight: location.pathname === item.path ? 600 : 500,
                }}>
                  {item.text}
                </span>
              </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}

export default SidebarMenu;