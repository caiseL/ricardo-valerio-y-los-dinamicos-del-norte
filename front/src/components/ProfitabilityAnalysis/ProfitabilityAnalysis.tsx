import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const mockData = [
  { name: 'Evento A', rentabilidad: 75 },
  { name: 'Evento B', rentabilidad: 62 },
  { name: 'Evento C', rentabilidad: 80 },
  { name: 'Evento D', rentabilidad: 55 },
];

const ProfitabilityAnalysis = () => {
  const [data, setData] = useState(mockData);

  useEffect(() => {
    fetch('/api/profitability')
      .then(res => res.json())
      .then(apiData => {
        if (Array.isArray(apiData) && apiData.length > 0) setData(apiData);
      })
      .catch(() => setData(mockData));
  }, []);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Rentabilidad por Evento</Typography>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis unit="%" />
            <Tooltip />
            <Bar dataKey="rentabilidad" fill="#4caf50" />
          </BarChart>
        </ResponsiveContainer>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Comparativo de rentabilidad reciente.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfitabilityAnalysis;