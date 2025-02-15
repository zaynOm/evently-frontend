import { CrudObject, Id } from '@common/defs/types';

export interface Event extends CrudObject {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  hostId: Id;
  hostName: string;
  categoryId: Id;
  participantsCount: number;
}

export interface EventParticipant {
  fullName: string;
  joinedAt: string;
}
