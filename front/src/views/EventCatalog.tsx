import "../css/EventCatalog.css";
import * as React from "react";
import Button from "@mui/material/Button";
import EventCard from "../components/EventCard/EventCard";
import EventForm from "../components/EventForm/EventForm";

function EventCatalog() {
  const [open, setOpen] = React.useState(false);
  const [selectedEvents, setSelectedEvents] = React.useState<any[]>([]);
  const [compareOpen, setCompareOpen] = React.useState(false);

  // Example event data (replace with your real data source)
  const events = [
    {
      id: 1,
      name: 'paquete 1',
      menu: 'barbacoa',
      music: 'banda',
      guests: 50,
      basePrice: 100000,
    },
    {
      id: 2,
      name: 'paquete 2',
      menu: 'mexicana',
      music: 'dj',
      guests: 80,
      basePrice: 150000,
    },
    {
      id: 3,
      name: 'paquete 3',
      menu: 'italiana',
      music: 'norteña',
      guests: 100,
      basePrice: 200000,
    },
  ];

  const handleOpenForm = () => setOpen(true);
  const handleCloseForm = () => setOpen(false);

  const handleSelectEvent = (event: any) => {
    setSelectedEvents((prev) => {
      const exists = prev.find((e) => e.id === event.id);
      if (exists) {
        return prev.filter((e) => e.id !== event.id);
      } else {
        return [...prev, event];
      }
    });
  };

  const handleCompare = () => {
    setCompareOpen(true);
  };
  const handleCloseCompare = () => setCompareOpen(false);

  return (
    <div className="event-catalog">
      <div className="event-catalog-content">
        <div className="header">
          <h2>Paquetes disponibles:</h2>
          <Button variant="contained" onClick={handleCompare} disabled={selectedEvents.length < 2}>
            Comparar
          </Button>
        </div>
        <div className="cards-container">
          {events.map((event) => (
            <div key={event.id} onClick={() => handleSelectEvent(event)} style={{ cursor: 'pointer' }}>
              <EventCard
                name={event.name}
                menu={event.menu}
                music={event.music}
                guests={event.guests}
                basePrice={event.basePrice}
                onDetailsClick={handleOpenForm}
                selected={!!selectedEvents.find((e) => e.id === event.id)}
              />
            </div>
          ))}
        </div>
        <EventForm open={open} onClose={handleCloseForm} />
        {compareOpen && (
          <div className="compare-modal" style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 8, padding: 24, position: 'fixed', top: '10%', left: '10%', right: '10%', zIndex: 1300 }}>
            <h3>Comparación de paquetes</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Nombre</th>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Menú</th>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Música</th>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Invitados</th>
                  <th style={{ border: '1px solid #ccc', padding: 8 }}>Precio base</th>
                </tr>
              </thead>
              <tbody>
                {selectedEvents.map((event) => (
                  <tr key={event.id}>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>{event.name}</td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>{event.menu}</td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>{event.music}</td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>{event.guests}</td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>${event.basePrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button onClick={handleCloseCompare} variant="outlined" sx={{ mt: 2 }}>Cerrar</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EventCatalog;
