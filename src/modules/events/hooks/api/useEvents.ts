import ApiRoutes from '@common/defs/api-routes';
import { Event, EventParticipant } from '@modules/events/defs/types';
import useItems, { defaultOptions, UseItemsHook, UseItemsOptions } from '@common/hooks/useItems';
import { Dayjs } from 'dayjs';
import useApi, { FetchApiOptions, ApiResponse } from '@common/hooks/useApi';
import { Id } from '@common/defs/types';

export interface CreateOneInput {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  categoryId: number;
}

export interface UpdateOneInput {
  title: string;
  description: string;
  date: Dayjs;
  time: string;
  location: string;
  capacity: number;
  categoryId: number;
}

export type UpsertOneInput = CreateOneInput & UpdateOneInput;

export type UseEventsHook = UseItemsHook<Event, CreateOneInput, UpdateOneInput> & {
  joinEvent: (id: Id, options?: FetchApiOptions) => Promise<ApiResponse<{ item: Event }>>;
  leaveEvent: (id: Id, options?: FetchApiOptions) => Promise<ApiResponse<{ item: Event }>>;
  participants: (
    id: Id,
    options?: FetchApiOptions
  ) => Promise<ApiResponse<{ items: EventParticipant[] }>>;
};

const useEvents = (opts: UseItemsOptions = defaultOptions): UseEventsHook => {
  const apiRoutes = ApiRoutes.Events;
  const useItemsHook = useItems<Event, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
  const fetchApi = useApi();

  const joinEvent = async (id: Id, options?: FetchApiOptions) => {
    const response = await fetchApi<{ item: Event }>(
      ApiRoutes.Events.JoinEvent.replace('{id}', id.toString()),
      { ...options, method: 'POST' }
    );
    return response;
  };

  const leaveEvent = async (id: Id, options?: FetchApiOptions) => {
    const response = await fetchApi<{ item: Event }>(
      ApiRoutes.Events.LeaveEvent.replace('{id}', id.toString()),
      { ...options, method: 'POST' }
    );
    return response;
  };

  const participants = async (id: Id, options?: FetchApiOptions) => {
    const response = await fetchApi<{ items: EventParticipant[] }>(
      ApiRoutes.Events.Participants.replace('{id}', id.toString()),
      options
    );
    return response;
  };

  return {
    ...useItemsHook,
    joinEvent,
    leaveEvent,
    participants,
  };
};

export default useEvents;
