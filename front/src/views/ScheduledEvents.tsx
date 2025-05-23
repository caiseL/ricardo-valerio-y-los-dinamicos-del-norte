import '../css/ScheduledEvents.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import EventBar from '../components/EventBar/EventBar';
import EventDetails from '../components/EventDetails/EventsDetails';

const mockEvent = {
  id: 1,
  name: "Fiesta de Cumpleaños",
  status: "Confirmado",
  date: "2024-06-15",
  startTime: "18:00",
  endTime: "23:00",
  place: "Salón Principal",
  music: "DJ en vivo",
  guests: 50,
  menu: "Buffet internacional",
  cost: 1200
};

function ScheduledEvents() {
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(mockEvent);

  const handleOpenForm = () => setOpen(true);
  const handleCloseForm = () => setOpen(false);

  return (
    <div className="scheduled-events">
      <h2>Mis eventos:</h2>   
      <div className="bar-container">        
        <EventBar name="Evento 1" status="Confirmado" onDetailsClick={handleOpenForm}></EventBar>
        <EventDetails 
          open={open} 
          onClose={handleCloseForm} 
          event={selectedEvent}
        />
      </div>
    </div>
  );
}

export default ScheduledEvents;
