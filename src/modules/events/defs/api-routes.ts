import { CrudApiRoutes } from '@common/defs/types';

const prefix = '/events';
const ApiRoutes: CrudApiRoutes = {
  CreateOne: prefix,
  ReadAll: prefix,
  ReadOne: prefix + '/{id}',
  UpdateOne: prefix + '/{id}',
  DeleteOne: prefix + '/{id}',
  JoinEvent: prefix + '/{id}/join',
  LeaveEvent: prefix + '/{id}/leave',
  Participants: prefix + '/{id}/participants',
};

export default ApiRoutes;
