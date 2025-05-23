import './EventCard.css';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

interface EventCardProps {
  name: string;
  minAttendees: number;
  maxAttendees: number;
  menuOptions: string[];
  musicOptions: string[];
  baseCost: number;
  selected: boolean;
  onDetailsClick?: () => void;
  onClick?: () => void;
}

function EventCard(props: EventCardProps) {
  const convertListToString = (list: string[]) => {
    return list.length > 0 ? list.join(", ") : "Ninguna opción disponible";
  }

  return (
    <Box sx={{
      width: 150,
      height: 280,
      padding: 1,
      borderRadius: 1,
      backgroundColor: '#f5f5f5',
      border: '2px solid',
      borderColor: props.selected ? 'primary.main' : 'grey.400',
    }}>
      <h3>{props.name}</h3>
      <p><strong>Opciones de Música:</strong> {convertListToString(props.musicOptions)}</p>
      <p><strong>Opciones de Menú:</strong> {convertListToString(props.menuOptions)}</p>
      <p><strong>Invitados:</strong> {props.minAttendees} - {props.maxAttendees}</p>
      <p><strong>Precio base:</strong> ${props.baseCost}</p>
      <Button variant='contained' onClick={props.onDetailsClick}>Ver detalles</Button>
    </Box>
  );
}

export default EventCard;
