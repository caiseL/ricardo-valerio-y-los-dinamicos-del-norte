import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

function SidebarMenu() {
  return (
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
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/client/catalog">
            <ListItemText primary="Paquetes disponibles" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/client/schedule">
            <ListItemText primary="Mis eventos" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}

export default SidebarMenu;