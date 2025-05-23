import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
  Alert,
  TextField,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface InventoryItem {
  id: string | number;
  name: string;
  quantity: number;
  category?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#B71C1C', '#6A1B9A'];

function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemQuantity, setNewItemQuantity] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      try {
        const exampleData: InventoryItem[] = [
          { id: 1, name: 'Manteles', quantity: 50, category: 'Textiles' },
          { id: 2, name: 'Sillas Plegables', quantity: 200, category: 'Mobiliario' },
          { id: 3, name: 'Copas de Vino', quantity: 150, category: 'Vajilla' },
          { id: 4, name: 'Vasos', quantity: 20, category: 'Vajilla' },
          { id: 5, name: 'Servilletas', quantity: 10, category: 'Textiles' },
        ];
        setInventoryItems(exampleData);
        setIsLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        setIsLoading(false);
      }
    }, 1000);
  }, []);

  // Resumen
  const totalItems = inventoryItems.length;
  const totalQuantity = inventoryItems.reduce((acc, item) => acc + item.quantity, 0);
  const categories = Array.from(new Set(inventoryItems.map(item => item.category || 'Sin categoría')));
  const itemsByCategory = categories.map(cat => ({
    name: cat,
    value: inventoryItems.filter(item => (item.category || 'Sin categoría') === cat)
      .reduce((acc, item) => acc + item.quantity, 0),
  }));

  // Añadir nuevo ítem
  const handleAddNewItem = () => {
    if (!newItemName.trim() || !newItemQuantity.trim()) {
      setError("Por favor, ingresa nombre y cantidad.");
      return;
    }
    const quantity = parseInt(newItemQuantity, 10);
    if (isNaN(quantity) || quantity < 0) {
      setError("La cantidad debe ser un número válido.");
      return;
    }
    setError(null);
    const newItem: InventoryItem = {
      id: `new-${Date.now()}`,
      name: newItemName,
      quantity: quantity,
      category: 'General',
    };
    setInventoryItems(prevItems => [...prevItems, newItem]);
    setNewItemName('');
    setNewItemQuantity('');
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Cargando inventario...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Inventario
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Resumen visual */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Card sx={{ flex: 1, minWidth: 220 }}>
          <CardContent>
            <Typography variant="subtitle1">Total de Ítems</Typography>
            <Typography variant="h5">{totalItems}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 220 }}>
          <CardContent>
            <Typography variant="subtitle1">Cantidad Total</Typography>
            <Typography variant="h5">{totalQuantity}</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 220 }}>
          <CardContent>
            <Typography variant="subtitle1">Categorías</Typography>
            <Typography variant="h5">{categories.length}</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Gráfica de pastel */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Distribución por Categoría</Typography>
        <Box sx={{ width: '100%', height: 250 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={itemsByCategory}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {itemsByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* Formulario para añadir ítem */}
      <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Añadir Nuevo Ítem</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            label="Nombre del Ítem"
            variant="outlined"
            size="small"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            sx={{ flexGrow: 1, minWidth: '200px' }}
          />
          <TextField
            label="Cantidad"
            variant="outlined"
            type="number"
            size="small"
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(e.target.value)}
            inputProps={{ min: "0" }}
            sx={{ width: '120px' }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddNewItem}
            sx={{ height: '40px' }}
          >
            Añadir Ítem
          </Button>
        </Box>
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* Lista de Items de Inventario */}
      <Typography variant="h5" component="h2" gutterBottom>
        Ítems Actuales
      </Typography>
      {inventoryItems.length === 0 ? (
        <Typography>No hay ítems en el inventario.</Typography>
      ) : (
        <Paper elevation={1}>
          <List>
            {inventoryItems.map((item, index) => (
              <React.Fragment key={item.id}>
                <ListItem>
                  <ListItemText
                    primary={`${item.name} (${item.category || 'Sin categoría'})`}
                    secondary={
                      <Typography
                        component="span"
                        color={item.quantity < 15 ? 'error.main' : 'text.primary'}
                        fontWeight={item.quantity < 15 ? 'bold' : 'normal'}
                      >
                        Cantidad: {item.quantity}
                        {item.quantity < 15 && ' (Bajo)'}
                      </Typography>
                    }
                  />
                  <Button variant="outlined" size="small" onClick={() => alert(`Editar ${item.name} - ¡Funcionalidad pendiente!`)}>
                    Editar
                  </Button>
                  <Button variant="outlined" size="small" color="error" sx={{ ml: 1 }} onClick={() => alert(`Eliminar ${item.name} - ¡Funcionalidad pendiente!`)}>
                    Eliminar
                  </Button>
                </ListItem>
                {index < inventoryItems.length - 1 && <Divider component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

export default InventoryPage;