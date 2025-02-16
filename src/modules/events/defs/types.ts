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
  categoryName: string;
  participantsCount: number;
  isParticipant: boolean;
}

export interface EventParticipant extends CrudObject {
  fullName: string;
  joinedAt: string;
}
