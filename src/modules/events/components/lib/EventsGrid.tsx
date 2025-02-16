import Namespaces from '@common/defs/namespaces';
import EventGridItem from '@modules/events/components/lib/EventGridItem';
import { Event } from '@modules/events/defs/types';
import { Box, Grid, Typography } from '@mui/material';

interface EventsListProps {
  events: Event[];
  fetchEvents: () => Promise<void>;
  emptyMessage?: string;
}

const EventsGrid = (props: EventsListProps) => {
  const { events, fetchEvents, emptyMessage = 'No events found' } = props;
  if (!events || events.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {events.map((event) => (
        <Grid item xs={12} md={6} lg={4} key={event.id}>
          <EventGridItem event={event} fetchEvents={fetchEvents} namespace={Namespaces.Events} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EventsGrid;
