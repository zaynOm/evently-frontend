import ApiRoutes from '@common/defs/api-routes';
import useApi from '@common/hooks/useApi';
import EventGridItem from '@modules/events/components/lib/EventGridItem';
import { Event } from '@modules/events/defs/types';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useEffect, useState } from 'react';

dayjs.extend(customParseFormat);

interface EventsResponse {
  items: Event[];
}

const EventsGrid = () => {
  const fetchApi = useApi();
  const [events, setEvents] = useState<{
    hosting: EventsResponse['items'];
    attending: EventsResponse['items'];
  }>({
    hosting: [],
    attending: [],
  });
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      const hostingResponse = await fetchApi<EventsResponse>(ApiRoutes.Users.HostingEvents);
      const attendingResponse = await fetchApi<EventsResponse>(ApiRoutes.Users.AttendedEvents);

      const hostingEvents = hostingResponse.success ? hostingResponse.data?.items || [] : [];
      const attendingEvents = attendingResponse.success ? attendingResponse.data?.items || [] : [];

      setEvents({
        hosting: hostingEvents,
        attending: attendingEvents,
      });
    };

    fetchEvents();
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const renderEventGrid = (eventList: EventsResponse['items']) => {
    if (!eventList || eventList.length === 0) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '300px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" color="textSecondary">
            No events found.
          </Typography>
        </Box>
      );
    }

    return (
      <Grid container spacing={3}>
        {eventList.map((event) => (
          <EventGridItem event={event} key={event.id} />
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
      >
        <Tab label="Hosting Events" />
        <Tab label="Attending Events" />
      </Tabs>
      {activeTab === 0 && renderEventGrid(events.hosting)}
      {activeTab === 1 && renderEventGrid(events.attending)}
    </Box>
  );
};

export default EventsGrid;
