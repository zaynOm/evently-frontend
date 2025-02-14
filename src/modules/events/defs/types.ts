import { CrudObject } from '@common/defs/types';

export interface Event extends CrudObject {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  host_id: number;
  hostName: string;
  category_id: number;
  created_at: string;
  updated_at: string;
}

export interface EventParticipant {
  fullName: string;
  joined_at: string;
}
