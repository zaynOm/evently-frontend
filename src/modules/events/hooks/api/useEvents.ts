import ApiRoutes from '@common/defs/api-routes';
import { Event } from '@modules/events/defs/types';
import useItems, { defaultOptions, UseItems, UseItemsOptions } from '@common/hooks/useItems';

export interface CreateOneInput {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  category_id: number;
}

export interface UpdateOneInput {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  category_id: number;
}

export type UpsertOneInput = CreateOneInput & UpdateOneInput;

const useEvents: UseItems<Event, CreateOneInput, UpdateOneInput> = (
  opts: UseItemsOptions = defaultOptions
) => {
  const apiRoutes = ApiRoutes.Events;
  const useItemsHook = useItems<Event, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
  return useItemsHook;
};

export default useEvents;
