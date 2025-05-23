import '../css/ScheduledEvents.css';
import * as React from 'react';
import EventBar from '../components/EventBar/EventBar';
import EventDetails from '../components/EventDetails/EventsDetails';
import { ApiService, UserEvent } from '../services/api.service';
import Button from '@mui/material/Button';

function ScheduledEvents() {
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(null);
  const [userEvents, setUserEvents] = React.useState<UserEvent[]>([]);

  const handleOpenForm = () => setOpen(true);
  const handleCloseForm = () => setOpen(false);

  React.useEffect(() => {
    ApiService.getUserEvents()
      .then((response) => {
        console.log(response)
        setUserEvents(response);
      })
      .catch((error) => {
        console.error("Error fetching user events:", error);
      });
  }, []);


  return (
    <div className="scheduled-events">
      <h2>Mis eventos:</h2>
      {
        userEvents.map((event) => (
          <div className="bar-container" key={event.id}>
            <EventBar name={event.name} status={event.status} onDetailsClick={handleOpenForm}></EventBar>
            <EventDetails
              open={open}
              onClose={handleCloseForm}
              event={event}
            />
          </div>
        ))
      }
    </div >
  );
}

export default ScheduledEvents;
