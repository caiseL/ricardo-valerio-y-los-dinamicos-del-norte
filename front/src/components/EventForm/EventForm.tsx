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
import { Box, Stack, Alert } from '@mui/material';

interface EventFormProps {
  event: EventOption | undefined;
  onClose: () => void;
}

export default function EventForm({ event: eventOption, onClose }: EventFormProps) {
  const [form, setForm] = React.useState({
    startDate: new Date().toISOString().slice(0, 16) || '',
    name: '',
    endDate: '',
    hall: '',
    attendees: '',
    catering: false,
    menu: '',
    music: '',
  });
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [cost, setCost] = React.useState<number>(0);
  const [halls, setHalls] = React.useState<EventHall[]>([]);

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

  const fetchHalls = () => {
    ApiService.getEventHalls()
      .then((response) => {
        setHalls(response);
      })
      .catch((error) => {
        console.error('Error fetching halls:', error);
        setErrorMessage('Error fetching halls. Please try again.');
      });
  }


  React.useEffect(
    () => {
      fetchHalls();
    },
    []
  )

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

  if (!eventOption) {
    return null;
  }

  return (
    <Dialog
      open={eventOption !== undefined}
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

          <Stack spacing={2.5} sx={{ mt: 1 }}>

            <TextField
              disabled
              margin="dense"
              id="cost"
              name="cost"
              label="Costo estimado"
              type="number"
              fullWidth
              value={cost}
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
        </DialogContent >

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
      </form >
    </Dialog >
  );
}
