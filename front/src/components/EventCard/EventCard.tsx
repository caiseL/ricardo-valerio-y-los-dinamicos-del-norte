import './EventCard.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

interface EventCardProps {
  name: string;
  music: string;
  menu: string;
  guests: number;
  basePrice: number;
  selected: boolean;
  onDetailsClick?: () => void;
  onClick?: () => void;
}

function EventCard(props: EventCardProps) {

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
      <p><strong>Música:</strong> {props.music}</p>
      <p><strong>Menú:</strong> {props.menu}</p>
      <p><strong>Invitados:</strong> {props.guests}</p>
      <p><strong>Precio base:</strong> ${props.basePrice}</p>
      <Button variant='contained' onClick={props.onDetailsClick}>Ver detalles</Button>
    </Box>
  );
}

export default EventCard;
