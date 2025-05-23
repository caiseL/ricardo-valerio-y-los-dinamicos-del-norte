import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, LinearProgress, Box } from '@mui/material';

const mockSatisfaction = 82;

const CustomerSatisfaction = () => {
  const [satisfaction, setSatisfaction] = useState<number>(mockSatisfaction);

  useEffect(() => {
    fetch('/api/customer-satisfaction')
      .then(res => res.json())
      .then(apiData => {
        if (typeof apiData === 'number') setSatisfaction(apiData);
      })
      .catch(() => setSatisfaction(mockSatisfaction));
  }, []);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Satisfacción del Cliente</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Box sx={{ width: '100%', mr: 2 }}>
            <LinearProgress variant="determinate" value={satisfaction} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${satisfaction}%`}</Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Basado en encuestas recientes.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomerSatisfaction;