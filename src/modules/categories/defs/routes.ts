import { CrudAppRoutes } from '@common/defs/types';

const prefix = '/categories';
const Routes: CrudAppRoutes = {
  ReadAll: prefix,
  CreateOne: prefix + '/create',
  UpdateOne: prefix + '/{id}',
  DeleteOne: prefix + '/{id}',
};

export default Routes;
