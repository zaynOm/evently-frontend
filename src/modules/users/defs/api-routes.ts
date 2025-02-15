import { CrudApiRoutes } from '@common/defs/types';

const prefix = '/users';
const ApiRoutes: CrudApiRoutes = {
  CreateOne: prefix,
  ReadAll: prefix,
  ReadOne: prefix + '/{id}',
  UpdateOne: prefix + '/{id}',
  DeleteOne: prefix + '/{id}',
  HostingEvents: prefix + '/hosting-events',
  AttendedEvents: prefix + '/attended-events',
};

export default ApiRoutes;
