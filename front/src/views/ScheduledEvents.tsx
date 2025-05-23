import '../css/ScheduledEvents.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import EventBar from '../components/EventBar/EventBar';

function ScheduledEvents() {
  return (
    <div className="scheduled-events">
      <h2>Mis eventos:</h2>   
      <div className="bar-container">        
        <EventBar name="Evento 1" status="Confirmado"></EventBar>
        <EventBar name="Evento 1" status="Confirmado"></EventBar>
        <EventBar name="Evento 1" status="Confirmado"></EventBar>
        <EventBar name="Evento 1" status="Confirmado"></EventBar>
      </div>
    </div>
  );
}

export default ScheduledEvents;
