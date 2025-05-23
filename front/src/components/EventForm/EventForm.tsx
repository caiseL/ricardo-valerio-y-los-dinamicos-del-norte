import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from '@mui/material/InputAdornment';
import { Box, Stack, Alert } from '@mui/material';

interface EventFormProps {
  open: boolean;
  onClose: () => void;
}

export default function EventForm({ open, onClose }: EventFormProps) {
  const [form, setForm] = React.useState({
    date: '',
    startTime: '',
    endTime: '',
    place: '',
    music: '',
    guests: '',
    menu: '',
    cost: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(form);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 1
        }
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          <Box sx={{ mb: 1 }}>
            <DialogContentText variant="h5" sx={{ fontWeight: 'bold', color: 'text.primary', mb: 1 }}>
              Reservar Evento
            </DialogContentText>
            <DialogContentText>
              Completa los detalles para tu evento
            </DialogContentText>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2.5} sx={{ mt: 1 }}>
            <TextField
              required
              id="date"
              name="date"
              label="Fecha"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={form.date}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                required
                id="startTime"
                name="startTime"
                label="Horario de inicio"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.startTime}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                required
                id="endTime"
                name="endTime"
                label="Horario de finalización"
                type="time"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.endTime}
                onChange={handleChange}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Stack>

            <TextField
              required
              id="place"
              name="place"
              label="Lugar"
              select
              fullWidth
              value={form.place}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              <MenuItem value="salon1">Salón Principal</MenuItem>
              <MenuItem value="salon2">Salón VIP</MenuItem>
              <MenuItem value="jardin">Jardín de Eventos</MenuItem>
            </TextField>

            <TextField
              required
              id="music"
              name="music"
              label="Música"
              select
              fullWidth
              value={form.music}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              <MenuItem value="banda">Banda</MenuItem>
              <MenuItem value="dj">DJ</MenuItem>
              <MenuItem value="norteña">Norteña</MenuItem>
              <MenuItem value="otro">Otro</MenuItem>
            </TextField>

            <TextField
              required
              id="guests"
              name="guests"
              label="Número de invitados"
              type="number"
              fullWidth
              value={form.guests}
              onChange={handleChange}
              inputProps={{ min: 1 }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            />

            <TextField
              required
              id="menu"
              name="menu"
              label="Menú"
              select
              fullWidth
              value={form.menu}
              onChange={handleChange}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
            >
              <MenuItem value="buffet">Buffet Internacional</MenuItem>
              <MenuItem value="mexicana">Comida Mexicana</MenuItem>
              <MenuItem value="gourmet">Menú Gourmet</MenuItem>
            </TextField>

            <TextField
              margin="dense"
              id="cost"
              name="cost"
              label="Costo estimado"
              type="number"
              fullWidth
              value={form.cost}
              onChange={handleChange}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                readOnly: true,
              }}
              helperText="El costo se calcula automáticamente basado en tus selecciones."
              sx={{ 
                '& .MuiOutlinedInput-root': { 
                  borderRadius: 2,
                  backgroundColor: 'action.hover'
                }
              }}
            />

            <Alert severity="info" sx={{ borderRadius: 2 }}>
              Los precios pueden variar según la temporada y disponibilidad.
            </Alert>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 'medium'
            }}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 'medium'
            }}
          >
            Reservar Evento
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
