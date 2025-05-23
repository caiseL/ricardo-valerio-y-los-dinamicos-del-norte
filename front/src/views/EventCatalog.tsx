import "../css/EventCatalog.css";
import * as React from "react";
import Button from "@mui/material/Button";
import EventCard from "../components/EventCard/EventCard";
import EventForm from "../components/EventForm/EventForm";
import { ApiService, EventOption } from "../services/api.service";

function EventCatalog() {
  const [open, setOpen] = React.useState(false);
  const [eventOptions, setEventOptions] = React.useState<EventOption[]>([]);
  const [selectedEvents, setSelectedEvents] = React.useState<any[]>([]);
  const [compareOpen, setCompareOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(false);

  const handleOpenForm = () => setOpen(true);
  const handleCloseForm = () => setOpen(false);

  React.useEffect(
    () => {
      ApiService.getEventOptions()
        .then((response) => {
          console.log(response)
          setEventOptions(response);
        })
        .catch((error) => {
          console.error("Error fetching event options:", error);
        });
    }, []
  );

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

  const handleCompare = () => setCompareOpen(true);
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
          {eventOptions.map((eventOption) => (
            <div key={eventOption.id} onClick={() => handleSelectEvent(eventOption)} style={{ cursor: "pointer" }}>
              <EventCard
                name={eventOption.name}
                minAttendees={eventOption.options.minAttendees}
                maxAttendees={eventOption.options.maxAttendees}
                menuOptions={eventOption.options.menuOptions}
                musicOptions={eventOption.options.musicOptions}
                baseCost={eventOption.options.baseCost}
                onDetailsClick={handleOpenForm}
                selected={!!selectedEvents.find((e) => e.id === eventOption.id)}
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
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>{event.options.menuOptions?.join(", ")}</td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>{event.options.musicOptions?.join(", ")}</td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>{event.options.maxAttendees}</td>
                    <td style={{ border: '1px solid #ccc', padding: 8 }}>${event.options.baseCost}</td>
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
