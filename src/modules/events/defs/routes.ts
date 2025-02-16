import { CrudAppRoutes } from '@common/defs/types';

const prefix = '/events';
const Routes: CrudAppRoutes = {
  ReadOne: prefix + '/{id}',
  ReadAll: prefix,
  MyEvents: prefix + '/my-events',
  CreateOne: prefix + '/create',
  UpdateOne: prefix + '/{id}/edit',
  DeleteOne: prefix + '/{id}',
  JoinEvent: prefix + '/{id}/join',
  LeaveEvent: prefix + '/{id}/leave',
  Participants: prefix + '/{id}/participants',
};

export default Routes;
