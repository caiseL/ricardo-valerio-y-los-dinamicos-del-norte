import './EventBar.css';
import * as React from 'react';
import Button from '@mui/material/Button';

interface EventBarProps {
  name: string;
  status: string;
}

function EventBar(props: EventBarProps) {
  return (
    <div className='event-bar'>
      <h3>{props.name}</h3>
      <p>{props.status}</p>
      <Button variant='contained'>Ver detalles</Button>
      <Button variant='contained' color='error'>Cancelar</Button>
    </div>
  );
}

export default EventBar;
