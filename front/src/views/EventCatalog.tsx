import "../css/EventCatalog.css";
import * as React from "react";
import Button from "@mui/material/Button";
import EventCard from "../components/EventCard/EventCard";
import EventForm from "../components/EventForm/EventForm";
import { ApiService, EventOption } from "../services/api.service";

function EventCatalog() {
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(false);
  const [eventOptions, setEventOptions] = React.useState<EventOption[]>([]);

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

  return (
    <div className="event-catalog">
      <div className="event-catalog-content">
        <div className="header">
          <h2>Paquetes disponibles:</h2>
          <Button variant="contained">Comparar</Button>
        </div>
        <div className="cards-container">
          <div style={{ cursor: "pointer", display: "flex" }}>
            {
              eventOptions.map((eventOption) => (
                <EventCard
                  key={eventOption.id}
                  name={eventOption.name}
                  minAttendees={eventOption.options.minAttendees}
                  maxAttendees={eventOption.options.maxAttendees}
                  menuOptions={eventOption.options.menuOptions}
                  musicOptions={eventOption.options.musicOptions}
                  baseCost={eventOption.options.baseCost}
                  onDetailsClick={handleOpenForm}
                  selected={selectedEvent}
                />
              ))
            }
          </div>
        </div >
        <EventForm open={open} onClose={handleCloseForm} />
      </div >
    </div >
  );
}

export default EventCatalog;
