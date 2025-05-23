import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
  Alert,
  CircularProgress,
  Stack,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface Supplier {
  id: string | number;
  name: string;
  contact: string;
  deliveries: number;
  quality: number; // 1-5
  lastDelivery: string;
}

const mockSuppliers: Supplier[] = [
  {
    id: 1,
    name: 'Distribuidora Norte',
    contact: 'distribuidora@norte.com',
    deliveries: 12,
    quality: 4.5,
    lastDelivery: '2024-05-10',
  },
  {
    id: 2,
    name: 'Proveedora Fiesta',
    contact: 'contacto@fiesta.com',
    deliveries: 8,
    quality: 3.8,
    lastDelivery: '2024-05-18',
  },
  {
    id: 3,
    name: 'Eventos Express',
    contact: 'ventas@eventosexpress.com',
    deliveries: 15,
    quality: 5,
    lastDelivery: '2024-05-20',
  },
];

const SuppliersPage = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [quality, setQuality] = useState<number | null>(4);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Simula fetch a backend
    setTimeout(() => {
      fetch('/api/suppliers')
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) setSuppliers(data);
          else setSuppliers(mockSuppliers);
          setLoading(false);
        })
        .catch(() => {
          setSuppliers(mockSuppliers);
          setLoading(false);
        });
    }, 800);
  }, []);

  const handleAddSupplier = () => {
    if (!name.trim() || !contact.trim() || !quality) {
      setError('Completa todos los campos.');
      return;
    }
    setError(null);
    const newSupplier: Supplier = {
      id: `new-${Date.now()}`,
      name,
      contact,
      deliveries: 0,
      quality,
      lastDelivery: 'Sin entregas',
    };
    setSuppliers(prev => [newSupplier, ...prev]);
    setName('');
    setContact('');
    setQuality(4);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Proveedores
      </Typography>

      {/* Formulario */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Registrar Proveedor</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          alignItems="center"
          sx={{ flexWrap: 'wrap' }}
        >
          <TextField
            label="Nombre"
            value={name}
            onChange={e => setName(e.target.value)}
            size="small"
            sx={{ minWidth: 180 }}
          />
          <TextField
            label="Contacto"
            value={contact}
            onChange={e => setContact(e.target.value)}
            size="small"
            sx={{ minWidth: 180 }}
          />
          <Box>
            <Typography component="legend" sx={{ fontSize: 14 }}>Calidad</Typography>
            <Rating
              value={quality}
              precision={0.5}
              onChange={(_, value) => setQuality(value)}
              max={5}
            />
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddSupplier}
            sx={{ minWidth: 120, height: 40 }}
          >
            Registrar
          </Button>
        </Stack>
      </Paper>

      {/* Historial de proveedores */}
      <Typography variant="h5" gutterBottom>
        Historial de Proveedores
      </Typography>
      {loading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', my: 4 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Cargando proveedores...</Typography>
        </Box>
      ) : (
        <Paper elevation={1}>
          <List>
            {suppliers.map((s, idx) => (
              <React.Fragment key={s.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="subtitle1">{s.name}</Typography>
                        <Rating value={s.quality} precision={0.5} readOnly size="small" />
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          Contacto: {s.contact}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Entregas: {s.deliveries} | Última entrega: {s.lastDelivery}
                        </Typography>
                      </>
                    }
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => alert(`Ver historial de entregas de ${s.name} (pendiente)`)}
                  >
                    Ver historial
                  </Button>
                </ListItem>
                {idx < suppliers.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default SuppliersPage;