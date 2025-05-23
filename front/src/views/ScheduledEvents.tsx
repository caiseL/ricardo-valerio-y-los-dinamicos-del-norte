import '../css/ScheduledEvents.css';
import * as React from 'react';
import { Box, Container, Typography, Stack, Paper, Alert, CircularProgress, Fade } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import EventBar from '../components/EventBar/EventBar';
import EventDetails from '../components/EventDetails/EventsDetails';
import { ApiService, UserEvent } from '../services/api.service';

function ScheduledEvents() {
  const [open, setOpen] = React.useState(false);
  const [selectedEvent, setSelectedEvent] = React.useState<UserEvent | null>(null);
  const [userEvents, setUserEvents] = React.useState<UserEvent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const handleOpenDetails = (event: UserEvent) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleCloseDetails = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  React.useEffect(() => {
    setLoading(true);
    ApiService.getUserEvents()
      .then((response) => {
        setUserEvents(response);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching user events:", error);
        setError("No se pudieron cargar los eventos. Por favor, intenta más tarde.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Stack spacing={4}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={2}>
            <EventNoteIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              Mis Eventos
            </Typography>
          </Stack>

          {/* Content */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {error}
            </Alert>
          ) : userEvents.length === 0 ? (
            <Paper 
              elevation={0}
              sx={{ 
                p: 6, 
                textAlign: 'center',
                backgroundColor: 'background.default',
                borderRadius: 3
              }}
            >
              <EventNoteIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2, opacity: 0.5 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No tienes eventos programados
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Explora nuestro catálogo de eventos y programa uno nuevo.
              </Typography>
            </Paper>
          ) : (
            <Stack spacing={2}>
              {userEvents.map((event) => (
                <Fade key={event.id} in={true} timeout={500}>
                  <Box>
                    <EventBar
                      name={event.name}
                      status={event.status}
                      onDetailsClick={() => handleOpenDetails(event)}
                    />
                  </Box>
                </Fade>
              ))}
            </Stack>
          )}
        </Stack>

        {/* Event Details Dialog */}
        {selectedEvent && (
          <EventDetails
            open={open}
            onClose={handleCloseDetails}
            event={selectedEvent}
          />
        )}
      </Box>
    </Container>
  );
}

export default ScheduledEvents;
