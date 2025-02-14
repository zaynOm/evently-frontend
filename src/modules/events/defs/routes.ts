import { CrudAppRoutes } from '@common/defs/types';

const prefix = '/events';
const Routes: CrudAppRoutes = {
  ReadAll: prefix,
  CreateOne: prefix + '/create',
  UpdateOne: prefix + '/{id}',
  DeleteOne: prefix + '/{id}',
  JoinEvent: prefix + '/{id}/join',
  LeaveEvent: prefix + '/{id}/leave',
  Participants: prefix + '/{id}/participants',
};

export default Routes;
