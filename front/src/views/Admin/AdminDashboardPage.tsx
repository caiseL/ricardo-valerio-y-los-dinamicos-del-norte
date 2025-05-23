import React from 'react';
import { Typography, Box } from '@mui/material';

function AdminDashboardPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1">
        Admin Dashboard
      </Typography>
      <Typography variant="body1">
        This is the main dashboard for administrators.
      </Typography>
    </Box>
  );
}

export default AdminDashboardPage;