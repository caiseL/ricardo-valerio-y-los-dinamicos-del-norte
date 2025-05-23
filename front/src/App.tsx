import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Typography } from '@mui/material'; // Para la página 404

// Importaciones para el Admin
import AdminLayout from './layouts/AdminLayout'; // El layout que creamos
import AdminDashboardPage from './views/Admin/AdminDashboardPage';
import InventoryPage from './views/Admin/InventoryPage';
import ClientPage from './views/ClientPage';
import EventCatalog from './views/EventCatalog'; 
import ScheduledEvents from './views/ScheduledEvents';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/client" element={<ClientPage/>} >
          <Route index element={<Navigate to="catalog" replace />} />
          <Route path="catalog" element={<EventCatalog/>}/>
          <Route path="schedule" element={<ScheduledEvents/>}/>
        </Route>

        {/* RUTAS DE ADMINISTRADOR */}
        <Route path="/admin" element={<AdminLayout />}> {/* Ruta padre para el layout */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
        </Route>

        <Route path="*" element={<Typography variant="h3" sx={{ textAlign: 'center', mt: 5 }}>404: Page Not Found</Typography>} />
      </Routes>
    </Router>
  );
}

export default App;