import EventsGrid from '@modules/events/components/lib/EventsGrid';
import { Event } from '@modules/events/defs/types';
import useEvents from '@modules/events/hooks/api/useEvents';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import React, { useEffect, useState } from 'react';

dayjs.extend(customParseFormat);

const ExploarEvents = () => {
  const { items, readAll } = useEvents({ fetchItems: true });
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (items) {
      setEvents(items);
    }
  }, [items]);

  const fetchEvents = async () => {
    const response = await readAll();
    if (response.success) {
      setEvents(response.data?.items || []);
    }
  };

  return <EventsGrid events={events} fetchEvents={fetchEvents} />;
};

export default ExploarEvents;
