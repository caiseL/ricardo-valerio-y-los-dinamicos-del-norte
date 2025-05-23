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
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Formulario de evento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Introduce los datos del evento
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="date"
            name="date"
            label="Fecha"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="startTime"
            name="startTime"
            label="Horario de inicio"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.startTime}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="endTime"
            name="endTime"
            label="Horario de finalización"
            type="time"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.endTime}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="place"
            name="place"
            label="Lugar"
            type="text"
            fullWidth
            value={form.place}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="music"
            name="music"
            label="Música"
            select
            fullWidth
            value={form.music}
            onChange={handleChange}
          >
            <MenuItem value="banda">Banda</MenuItem>
            <MenuItem value="dj">DJ</MenuItem>
            <MenuItem value="norteña">Norteña</MenuItem>
            <MenuItem value="otro">Otro</MenuItem>
          </TextField>
          <TextField
            required
            margin="dense"
            id="guests"
            name="guests"
            label="Número de invitados"
            type="number"
            fullWidth
            value={form.guests}
            onChange={handleChange}
            inputProps={{ min: 1 }}
          />
          <TextField
            required
            margin="dense"
            id="menu"
            name="menu"
            label="Menú"
            type="text"
            fullWidth
            value={form.menu}
            onChange={handleChange}
          />
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
            helperText="El costo se calcula automáticamente."
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button type="submit" variant="contained">Guardar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}