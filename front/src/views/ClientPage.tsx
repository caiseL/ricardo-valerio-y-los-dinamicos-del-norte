import '../css/ClientPage.css';
import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMenu from '../components/SidebarMenu/SidebarMenu';
import { Box, Stack, Typography, IconButton, useMediaQuery, useTheme, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function ClientPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Sidebar */}
      <Box
        component="nav"
        sx={{
          width: { md: 280 },
          flexShrink: 0,
          display: { xs: sidebarOpen ? 'block' : 'none', md: 'block' },
          position: { xs: 'fixed', md: 'relative' },
          height: '100vh',
          zIndex: theme.zIndex.drawer,
          boxShadow: '4px 0 8px rgba(0, 0, 0, 0.05)',
          backgroundColor: 'background.paper',
        }}
      >
        <Stack spacing={2} sx={{ p: 3 }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <AccountCircleIcon sx={{ fontSize: 64, color: 'primary.main', mb: 1 }} />
            <Typography variant="h6" fontWeight="bold" color="primary">
              Bienvenido
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Panel de Cliente
            </Typography>
          </Box>
          <SidebarMenu />
        </Stack>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Paper
          elevation={0}
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: theme.zIndex.appBar,
            borderRadius: 0,
            px: 3,
            py: 2,
            backgroundColor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={2}
          >
            <IconButton
              color="primary"
              aria-label="menu"
              onClick={toggleSidebar}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h5"
              component="h1"
              color="text.primary"
              fontWeight="bold"
            >
              Ricardo Valerio y los Dinámicos del Norte
            </Typography>
          </Stack>
        </Paper>

        {/* Page content */}
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 } }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
