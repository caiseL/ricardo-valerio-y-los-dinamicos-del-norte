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
import { Checkbox, InputLabel, Select } from '@mui/material';
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
    catering: false,
    menu: '',
    music: '',
    name: '',
  });
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [cost, setCost] = React.useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateTotalCost = () => {
    const createEvent: CreateUserEventDto = {
      name: form.name,
      startDate: form.startDate,
      endDate: form.endDate,
      eventHallId: form.hall,
      eventOptionId: eventOption?.id!,
      details: {
        catering: form.catering,
        attendees: Number(form.attendees),
        menu: form.menu,
        music: form.music,
      }
    };
    ApiService.calculateEventCost(createEvent)
      .then((response) => {
        console.log('Cost calculated successfully:', response);
        setCost(response);
      })
      .catch((error) => {
        console.error('Error calculating cost:', error);
        setErrorMessage('Error calculating cost. Please try again.');
      });
  }

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
        catering: form.catering,
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
          <InputLabel id="catering">Servicio?</InputLabel>
          <Checkbox
            id="catering"
            checked={form.catering}
            onChange={(e) => {
              calculateTotalCost();
              return setForm({ ...form, catering: e.target.checked });
            }}
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
            onChange={
              (e) => {
                calculateTotalCost()
                return setForm({ ...form, startDate: e.target.value });
              }
            }
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
            onChange={
              (e) => {
                calculateTotalCost()
                return setForm({ ...form, endDate: e.target.value });
              }
            }
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
              (e) => {
                calculateTotalCost()
                return setForm({ ...form, music: e.target.value as string });
              }
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

          <InputLabel id="menu-label">Menu</InputLabel>
          <Select
            id="menu-label"
            value={form.menu}
            disabled={!eventOption?.options.menuOptions.length}
            onChange={
              (e) => {
                calculateTotalCost()
                return setForm({ ...form, menu: e.target.value as string });
              }
            }
          >
            {
              eventOption?.options.menuOptions.map((menu) => (
                <MenuItem key={menu} value={menu}>
                  {menu}
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
            onChange={
              (e) => {
                calculateTotalCost()
                return setForm({ ...form, attendees: e.target.value });
              }
            }
          />
          <TextField
            margin="dense"
            id="cost"
            name="cost"
            label="Costo estimado"
            type="number"
            fullWidth
            value={cost}
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
