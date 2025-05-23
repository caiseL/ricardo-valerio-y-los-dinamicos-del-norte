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
import { InputLabel, Select } from '@mui/material';
import { ApiService, CreateUserEventDto, EventHall, EventOption } from '../../services/api.service';

interface EventFormProps {
  event: EventOption | undefined;
  onClose: () => void;
  eventId?: string;
}

export default function EventForm({ event: eventOption, onClose }: EventFormProps) {
  const [halls, setHalls] = React.useState<EventHall[]>([]);

  const [form, setForm] = React.useState({
    startDate: new Date().toISOString().slice(0, 16) || '',
    endDate: '',
    hall: '',
    attendees: '',
    catering: '',
    menu: '',
    music: '',
    name: '',
  });
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const createEvent: CreateUserEventDto = {
      name: form.name,
      startDate: form.startDate,
      endDate: form.endDate,
      eventHallId: form.hall,
      eventOptionId: eventOption?.id!,
      details: {
        attendees: Number(form.attendees),
        menu: form.menu,
        music: form.music,
      }
    };
    ApiService.createEvent(createEvent)
      .then((response) => {
        console.log('Event created successfully:', response);
        onClose();
      })
      .catch((error) => {
        console.error('Error creating event:', error);
        setErrorMessage('Error creating event. Please try again.');
      });
  };

  React.useEffect(() => {
    ApiService.getEventHalls()
      .then((response) => {
        setHalls(response);
      })
      .catch((error) => {
        console.error('Error fetching event halls:', error);
      });
  }, []);

  if (!eventOption) {
    return null;
  }

  return (
    <Dialog open={event !== undefined} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Formulario de evento</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Introduce los datos del evento
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            name="name"
            label="Nombre del evento"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            required
            margin="dense"
            id="startDate"
            name="startDate"
            label="Inicio"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.startDate}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="endDate"
            name="endDate"
            label="Fin"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.endDate}
            onChange={handleChange}
          />
          <InputLabel id="hall-label">Salón</InputLabel>
          <Select
            id="hall-label"
            value={form.hall}
            onChange={
              (e) => setForm({ ...form, hall: e.target.value as string })
            }
          >
            {
              halls.map((hall) => (
                <MenuItem key={hall.id} value={hall.id}>
                  {hall.name}
                </MenuItem>
              ))
            }
          </Select>

          <InputLabel id="music-label">Musica</InputLabel>
          <Select
            id="music-label"
            value={form.music}
            disabled={!eventOption?.options.musicOptions.length}
            onChange={
              (e) => setForm({ ...form, music: e.target.value as string })
            }
          >
            {
              eventOption?.options.musicOptions.map((music) => (
                <MenuItem key={music} value={music}>
                  {music}
                </MenuItem>
              ))
            }
          </Select>
          <TextField
            required
            margin="dense"
            id="attendees"
            name="attendees"
            label="Número de invitados"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={form.attendees}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            id="cost"
            name="cost"
            label="Costo estimado"
            type="number"
            fullWidth
            value={0}
            onChange={handleChange}
            disabled
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

      {errorMessage && (
        <DialogContent>
          <DialogContentText color="error">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
      )}
    </Dialog>
  );
}
