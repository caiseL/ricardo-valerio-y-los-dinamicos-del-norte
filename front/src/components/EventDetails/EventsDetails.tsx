import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Typography, Box } from '@mui/material';

interface EventDetailsProps {
  open: boolean;
  onClose: () => void;
  event: {
    date: string;
    startTime: string;
    endTime: string;
    place: string;
    music: string;
    guests: number;
    menu: string;
    cost: number;
  };
}

export default function EventDetails({ open, onClose, event }: EventDetailsProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalles del evento</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle1"><strong>Fecha:</strong> {event.date}</Typography>
          <Typography variant="subtitle1"><strong>Horario de inicio:</strong> {event.startTime}</Typography>
          <Typography variant="subtitle1"><strong>Horario de finalización:</strong> {event.endTime}</Typography>
          <Typography variant="subtitle1"><strong>Lugar:</strong> {event.place}</Typography>
          <Typography variant="subtitle1"><strong>Música:</strong> {event.music}</Typography>
          <Typography variant="subtitle1"><strong>Número de invitados:</strong> {event.guests}</Typography>
          <Typography variant="subtitle1"><strong>Menú:</strong> {event.menu}</Typography>
          <Typography variant="subtitle1"><strong>Costo estimado:</strong> ${event.cost}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}