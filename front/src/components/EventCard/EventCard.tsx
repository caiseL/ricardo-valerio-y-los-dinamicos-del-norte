import './EventCard.css';
import * as React from 'react';
import Button from '@mui/material/Button';

interface EventCardProps {
  name: string;
  music: string;
  menu: string;
  guests: number;
  basePrice: number;
}

function EventCard(props: EventCardProps) {
  return (
    <div className='event-card'>
      <h3>{props.name}</h3>
      <p><strong>Música:</strong> {props.music}</p>
      <p><strong>Menú:</strong> {props.menu}</p>
      <p><strong>Invitados:</strong> {props.guests}</p>
      <p><strong>Precio base:</strong> ${props.basePrice}</p>
      <Button variant='contained'>Ver detalles</Button>
    </div>
  );
}

export default EventCard;
