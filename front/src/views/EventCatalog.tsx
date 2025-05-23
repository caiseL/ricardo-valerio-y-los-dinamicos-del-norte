import "../css/EventCatalog.css";
import * as React from "react";
import Button from "@mui/material/Button";
import EventCard from "../components/EventCard/EventCard";
import EventForm from "../components/EventForm/EventForm";

function EventCatalog() {
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState(false);

  const handleOpenForm = () => setOpen(true);
  const handleCloseForm = () => setOpen(false);
  const handleOnClick = () => {
    setSelectedEvent((prev) => !prev);
  };

  return (
    <div className="event-catalog">
      <div className="event-catalog-content">
        <div className="header">
          <h2>Paquetes disponibles:</h2>
          <Button variant="contained">Comparar</Button>
        </div>
        <div className="cards-container">
          <div onClick={handleOnClick} style={{ cursor: "pointer" }}>
            <EventCard
              name="paquete 1"
              menu="barbacoa"
              music="banda"
              guests={50}
              basePrice={100000}
              onDetailsClick={handleOpenForm}
              selected={selectedEvent}
            />
          </div>
        </div>
        <EventForm open={open} onClose={handleCloseForm} />
      </div>
    </div>
  );
}

export default EventCatalog;
