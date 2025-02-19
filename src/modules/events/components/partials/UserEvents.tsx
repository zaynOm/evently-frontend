import ApiRoutes from '@common/defs/api-routes';
import useApi from '@common/hooks/useApi';
import EventsGrid from '@modules/events/components/lib/EventsGrid';
import { Event } from '@modules/events/defs/types';
import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface EventsResponse {
  items: Event[];
}

const UserEvents = () => {
  const fetchApi = useApi();
  const { t } = useTranslation(['event']);
  const [hostingEvents, setHostingEvents] = useState<Event[]>([]);
  const [attendingEvents, setAttendingEvents] = useState<Event[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  const fetchHostingEvents = async () => {
    const response = await fetchApi<EventsResponse>(ApiRoutes.Users.HostingEvents);
    if (response.success) {
      setHostingEvents(response.data?.items || []);
    }
  };

  const fetchAttendingEvents = async () => {
    const response = await fetchApi<EventsResponse>(ApiRoutes.Users.AttendedEvents);
    if (response.success) {
      setAttendingEvents(response.data?.items || []);
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      await fetchHostingEvents();
      await fetchAttendingEvents();
    };

    fetchEvents();
  }, []);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}
      >
        <Tab label={t('event:tabs:hosting')} />
        <Tab label={t('event:tabs:attending')} />
      </Tabs>
      {activeTab === 0 && (
        <EventsGrid
          events={hostingEvents}
          fetchEvents={fetchHostingEvents}
          emptyMessage={t('event:tabs:no_hosting_events_found')}
        />
      )}
      {activeTab === 1 && (
        <EventsGrid
          events={attendingEvents}
          fetchEvents={fetchAttendingEvents}
          emptyMessage={t('event:tabs:no_attending_events_found')}
        />
      )}
    </Box>
  );
};

export default UserEvents;
