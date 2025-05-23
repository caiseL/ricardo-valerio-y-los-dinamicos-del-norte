import "../css/EventCatalog.css";
import * as React from "react";
import { Box, Typography, Button, Paper, Stack, Container, Fade } from "@mui/material";
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import EventCard from "../components/EventCard/EventCard";
import EventForm from "../components/EventForm/EventForm";
import { ApiService, EventOption } from "../services/api.service";

function EventCatalog() {
  const [open, setOpen] = React.useState(false);
  const [eventOptions, setEventOptions] = React.useState<EventOption[]>([]);
  const [selectedEvents, setSelectedEvents] = React.useState<EventOption[]>([]);
  const [selectedEvent, setSelectedEvent] = React.useState<EventOption | undefined>(undefined);
  const [compareOpen, setCompareOpen] = React.useState(false);

  const handleOpenForm = () => setOpen(true);
  const handleCloseForm = () => setOpen(false);
  const handleCompare = () => setCompareOpen(true);
  const handleCloseCompare = () => setCompareOpen(false);

  React.useEffect(() => {
    ApiService.getEventOptions()
      .then((response) => {
        setEventOptions(response);
      })
      .catch((error) => {
        console.error("Error fetching event options:", error);
      });
  }, []);

  const handleSelectEvent = (event: EventOption) => {
    setSelectedEvents((prev) => {
      const exists = prev.find((e) => e.id === event.id);
      if (exists) {
        return prev.filter((e) => e.id !== event.id);
      } else {
        return [...prev, event];
      }
    });
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 4 }}
        >
          <Typography variant="h4" fontWeight="bold" color="text.primary">
            Paquetes Disponibles
          </Typography>
          <Button
            variant="contained"
            startIcon={<CompareArrowsIcon />}
            onClick={handleCompare}
            disabled={selectedEvents.length < 2}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Comparar Paquetes
          </Button>
        </Stack>

        {/* Cards Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: 3,
          }}
        >
          {eventOptions.map((eventOption) => (
            <Fade key={eventOption.id} in={true} timeout={500}>
              <Box onClick={() => handleSelectEvent(eventOption)}>
                <EventCard
                  name={eventOption.name}
                  minAttendees={eventOption.options.minAttendees}
                  maxAttendees={eventOption.options.maxAttendees}
                  menuOptions={eventOption.options.menuOptions}
                  musicOptions={eventOption.options.musicOptions}
                  baseCost={eventOption.options.baseCost}
                  onDetailsClick={
                    () => {
                      setSelectedEvent(eventOption);
                    }
                  }
                  selected={!!selectedEvents.find((e) => e.id === eventOption.id)}
                />
              </Box>
            </Fade>
          ))}
        </Box>

        {/* Compare Modal */}
        {compareOpen && (
          <Paper
            elevation={3}
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 1000,
              maxHeight: '90vh',
              overflow: 'auto',
              p: 4,
              borderRadius: 3,
              zIndex: (theme) => theme.zIndex.modal,
            }}
          >
            <Stack spacing={3}>
              <Typography variant="h5" fontWeight="bold" color="primary">
                Comparación de Paquetes
              </Typography>

              <Box sx={{ overflowX: 'auto' }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  backgroundColor: 'white',
                }}>
                  <thead>
                    <tr>
                      <th style={{
                        padding: '16px',
                        textAlign: 'left',
                        borderBottom: '2px solid #e2e8f0',
                        backgroundColor: '#f8fafc'
                      }}>
                        Características
                      </th>
                      {selectedEvents.map((event) => (
                        <th key={event.id} style={{
                          padding: '16px',
                          textAlign: 'left',
                          borderBottom: '2px solid #e2e8f0',
                          backgroundColor: '#f8fafc'
                        }}>
                          {event.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
                        Música
                      </td>
                      {selectedEvents.map((event) => (
                        <td key={event.id} style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
                          {event.options.musicOptions.join(", ")}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
                        Menú
                      </td>
                      {selectedEvents.map((event) => (
                        <td key={event.id} style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
                          {event.options.menuOptions.join(", ")}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
                        Capacidad
                      </td>
                      {selectedEvents.map((event) => (
                        <td key={event.id} style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>
                          {event.options.minAttendees} - {event.options.maxAttendees} personas
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td style={{ padding: '16px', borderBottom: '1px solid #e2e8f0', fontWeight: 600 }}>
                        Precio Base
                      </td>
                      {selectedEvents.map((event) => (
                        <td key={event.id} style={{
                          padding: '16px',
                          borderBottom: '1px solid #e2e8f0',
                          color: '#3b82f6',
                          fontWeight: 600
                        }}>
                          ${event.options.baseCost.toLocaleString()}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCloseCompare}
                  sx={{ borderRadius: 2, px: 3 }}
                >
                  Cerrar
                </Button>
              </Box>
            </Stack>
          </Paper>
        )}

        <EventForm event={selectedEvent} onClose={
          () => {
            setSelectedEvent(undefined);
            handleCloseForm();
          }
        } />
      </Box>
    </Container>
  );
}

export default EventCatalog;
