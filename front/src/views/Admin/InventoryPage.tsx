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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
interface InventoryItem {
  id: string | number;
  name: string;
  quantity: number;
  category?: string;
}

// Simulación de API_BASE_URL, ajusta si tienes una real
// const API_BASE_URL = 'http://localhost:TU_PUERTO_BACKEND/api/admin';

function InventoryPage() {
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [newItemName, setNewItemName] = useState<string>('');
  const [newItemQuantity, setNewItemQuantity] = useState<string>(''); // Usamos string para el input

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    console.log("Intentando cargar inventario...");

    // --- SIMULACIÓN DE LLAMADA AL BACKEND ---
    setTimeout(() => {
      try {
        // En un caso real:
        // const response = await fetch(`${API_BASE_URL}/inventory`);
        // if (!response.ok) throw new Error('Failed to fetch inventory');
        // const data: InventoryItem[] = await response.json();
        // setInventoryItems(data);

        // Datos de ejemplo
        const exampleData: InventoryItem[] = [
          { id: 1, name: 'Manteles', quantity: 50, category: 'Textiles' },
          { id: 2, name: 'Sillas Plegables', quantity: 200, category: 'Mobiliario' },
          { id: 3, name: 'Copas de Vino', quantity: 150, category: 'Vajilla' },
        ];
        setInventoryItems(exampleData);
        console.log("Inventario cargado (simulado):", exampleData);
        setIsLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
        console.error("Error cargando inventario (simulado):", errorMessage);
        setIsLoading(false);
      }
    }, 1000); // Simula un retraso de red
    // --- FIN SIMULACIÓN ---
  }, []); // Array vacío para que se ejecute solo al montar

  // Manejador para añadir un nuevo item (simulado)
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

    setError(null); // Limpiar errores previos

    const newItem: InventoryItem = {
      id: `new-${Date.now()}`, // ID temporal simple
      name: newItemName,
      quantity: quantity,
      category: 'General', // Categoría por defecto
    };

    // --- SIMULACIÓN DE ENVÍO AL BACKEND ---
    console.log('Intentando añadir nuevo ítem (simulado):', newItem);
    // En un caso real:
    // try {
    //   const response = await fetch(`${API_BASE_URL}/inventory`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(newItem), // Enviarías sin el ID temporal
    //   });
    //   if (!response.ok) throw new Error('Failed to add item');
    //   const addedItemFromApi: InventoryItem = await response.json();
    //   setInventoryItems(prevItems => [...prevItems, addedItemFromApi]);
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : 'Error añadiendo ítem');
    // }

    setInventoryItems(prevItems => [...prevItems, newItem]);
    setNewItemName(''); 
    setNewItemQuantity('');
    console.log('Nuevo ítem añadido (simulado) a la lista.');
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
    <Box sx={{ p: 3 }}> {/* Padding alrededor de toda la página */}
      <Typography variant="h4" component="h1" gutterBottom>
        Gestión de Inventario
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Formulario Simple para Añadir Item */}
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
            sx={{ height: '40px' }} // Para alinear con los TextFields small
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
                    secondary={`Cantidad: ${item.quantity}`}
                  />
                  {/* Aquí podrías añadir botones de Editar/Eliminar más adelante */}
                  <Button variant="outlined" size="small" onClick={() => alert(`Editar ${item.name} - ¡Funcionalidad pendiente!`)}>
                    Editar
                  </Button>
                  <Button variant="outlined" size="small" color="error" sx={{ml:1}} onClick={() => alert(`Eliminar ${item.name} - ¡Funcionalidad pendiente!`)}>
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