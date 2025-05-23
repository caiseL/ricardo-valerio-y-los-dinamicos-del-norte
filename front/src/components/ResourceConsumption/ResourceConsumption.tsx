import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

const mockResources = [
  { recurso: 'Bebidas', usado: 120, total: 150 },
  { recurso: 'Comida', usado: 90, total: 100 },
  { recurso: 'Decoración', usado: 40, total: 50 },
];

const ResourceConsumption = () => {
  const [resources, setResources] = useState(mockResources);

  useEffect(() => {
    fetch('/api/resource-consumption')
      .then(res => res.json())
      .then(apiData => {
        if (Array.isArray(apiData) && apiData.length > 0) setResources(apiData);
      })
      .catch(() => setResources(mockResources));
  }, []);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Consumo de Recursos</Typography>
        <Table size="small" sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Recurso</TableCell>
              <TableCell align="right">Usado</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resources.map((row) => (
              <TableRow key={row.recurso}>
                <TableCell>{row.recurso}</TableCell>
                <TableCell align="right">{row.usado}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Detalle del consumo por tipo de recurso.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ResourceConsumption;