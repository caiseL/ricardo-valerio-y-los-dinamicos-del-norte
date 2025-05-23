import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

function AdminSidebarMenu() {
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
        Admin Panel
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/admin/dashboard">
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/admin/inventory">
            <ListItemText primary="Inventory" />
          </ListItemButton>
        </ListItem>
        {/* Aquí podrías añadir más enlaces después */}
      </List>
    </Box>
  );
}

export default AdminSidebarMenu;