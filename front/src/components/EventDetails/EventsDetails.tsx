import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { Typography, Box } from '@mui/material';
import { UserEvent } from '../../services/api.service';

interface EventDetailsProps {
  open: boolean;
  onClose: () => void;
  event: UserEvent;
}



export default function EventDetails({ open, onClose, event }: EventDetailsProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalles del evento</DialogTitle>
      <DialogContent>
        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle1"><strong>Nombre:</strong> {event.name}</Typography>
          <Typography variant="subtitle1"><strong>Horario de inicio:</strong> {event.startDate}</Typography>
          <Typography variant="subtitle1"><strong>Horario de finalización:</strong> {event.endDate}</Typography>
          <Typography variant="subtitle1"><strong>Estado:</strong> {event.status}</Typography>
          <Typography variant="subtitle1"><strong>Menu:</strong> {event.details.menu}</Typography>
          <Typography variant="subtitle1"><strong>Música:</strong> {event.details.music}</Typography>
          <Typography variant="subtitle1"><strong>Invitados:</strong> {event.details.attendees}</Typography>
          <Typography variant="subtitle1"><strong>Costo estimado:</strong> ${event.cost}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
