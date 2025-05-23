import '../css/EventCatalog.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import EventCard from '../components/EventCard/EventCard';

function EventCatalog() {
  return (
    <div className="event-catalog">   
      <div className='event-catalog-content'>
        <div className='header'>
          <h2>Paquetes disponibles:</h2>
          <Button variant="contained" color="primary"> Comparar paquetes</Button>
        </div>
        <div className='cards-container'>
          <EventCard name="paquete 1" menu="barbacoa" music="banda" guests={50} basePrice={100000}></EventCard>
          <EventCard name="paquete 1" menu="barbacoa" music="banda" guests={50} basePrice={100000}></EventCard>
          <EventCard name="paquete 1" menu="barbacoa" music="banda" guests={50} basePrice={100000}></EventCard>
          <EventCard name="paquete 1" menu="barbacoa" music="banda" guests={50} basePrice={100000}></EventCard>
          <EventCard name="paquete 1" menu="barbacoa" music="banda" guests={50} basePrice={100000}></EventCard>
          <EventCard name="paquete 1" menu="barbacoa" music="banda" guests={50} basePrice={100000}></EventCard>
      
        </div>
        </div>
    </div>
  );
}

export default EventCatalog;
