import React from 'react';
import { Outlet } from 'react-router-dom'; // Importante
import { Box } from '@mui/material';
import AdminSidebarMenu from '../components/AdminSideBarMenu/AdminSideBarMenu'; // Ajusta la ruta si es necesario

function AdminLayout() {
  return (
    <Box sx={{ display: 'flex' }}> {/* Contenedor principal usando Flexbox */}
      <AdminSidebarMenu /> {/* Nuestro sidebar */}
      <Box
        component="main" // Semánticamente es el contenido principal
        sx={{
          flexGrow: 1, // Hace que esta caja ocupe todo el espacio restante
          padding: '24px', // Espaciado para el contenido
        }}
      >
        {/* Outlet es donde React Router renderizará el componente de la ruta hija activa */}
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;