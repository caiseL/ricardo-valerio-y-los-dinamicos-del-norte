import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Typography } from '@mui/material'; // Para la página 404

// Importa tu vista de cliente existente si la tienes en una ruta
// import EventCatalog from './pages/EventCatalog/EventCatalog';

// Importaciones para el Admin
import AdminLayout from './layouts/AdminLayout'; // El layout que creamos
import AdminDashboardPage from './views/Admin/AdminDashboardPage';
import InventoryPage from './views/Admin/InventoryPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta de ejemplo para tu vista de cliente */}
        {/* <Route path="/" element={<EventCatalog />} /> */}
        <Route path="/" element={<Typography variant="h3">Client View (Placeholder)</Typography>} />


        {/* RUTAS DE ADMINISTRADOR */}
        <Route path="/admin" element={<AdminLayout />}> {/* Ruta padre para el layout */}
          {/* Cuando visites /admin, redirige a /admin/dashboard */}
          <Route index element={<Navigate to="dashboard" replace />} />

          {/* Rutas hijas que se renderizarán dentro del <Outlet /> de AdminLayout */}
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          {/* Puedes añadir más rutas aquí más tarde, como "suppliers", "events", etc. */}
        </Route>

        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<Typography variant="h3" sx={{ textAlign: 'center', mt: 5 }}>404: Page Not Found</Typography>} />
      </Routes>
    </Router>
  );
}

export default App;