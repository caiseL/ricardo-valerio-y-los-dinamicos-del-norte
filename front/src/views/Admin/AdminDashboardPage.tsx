import React from 'react';
import { Box } from '@mui/material';
import ResourceConsumption from '../../components/ResourceConsumption/ResourceConsumption';
import StaffPerformance from '../../components/StaffPerformance/StaffPerformance';
import ProfitabilityAnalysis from '../../components/ProfitabilityAnalysis/ProfitabilityAnalysis';
import CustomerSatisfaction from '../../components/Customer Satisfaction/CustomerSatisfaction';

const AdminDashboardPage = () => (
  <Box sx={{ p: 3 }}>
    <ProfitabilityAnalysis />
    <CustomerSatisfaction />
    <ResourceConsumption />
    <StaffPerformance />
  </Box>
);

export default AdminDashboardPage;