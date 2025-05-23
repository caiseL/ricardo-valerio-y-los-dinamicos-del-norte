import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemIcon, ListItemText, Avatar, CircularProgress, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const getIcon = (desempeño: string) => {
  if (desempeño === 'Excelente') return <CheckCircleIcon color="success" />;
  if (desempeño === 'Bueno') return <CheckCircleIcon color="primary" />;
  return <ErrorIcon color="warning" />;
};

const mockStaff = [
  { nombre: 'Juan Pérez', desempeño: 'Excelente' },
  { nombre: 'Ana López', desempeño: 'Bueno' },
  { nombre: 'Carlos Ruiz', desempeño: 'Regular' },
];

const StaffPerformance = () => {
  const [staff, setStaff] = useState<{ nombre: string; desempeño: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/staff-performance')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setStaff(data);
        } else {
          setStaff(mockStaff);
        }
        setLoading(false);
      })
      .catch(() => {
        setStaff(mockStaff);
        setLoading(false);
      });
  }, []);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">Desempeño del Personal</Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          <List>
            {staff.map((persona) => (
              <ListItem key={persona.nombre}>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: 'transparent' }}>{getIcon(persona.desempeño)}</Avatar>
                </ListItemIcon>
                <ListItemText primary={persona.nombre} secondary={persona.desempeño} />
              </ListItem>
            ))}
          </List>
        )}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Evaluación del personal en eventos recientes.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StaffPerformance;