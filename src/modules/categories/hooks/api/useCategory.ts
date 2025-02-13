import ApiRoutes from '@common/defs/api-routes';
import { Category } from '@modules/categories/defs/types';
import useItems, { defaultOptions, UseItems, UseItemsOptions } from '@common/hooks/useItems';

export interface CreateOneInput {
  name: string;
}

export interface UpdateOneInput {
  name: string;
}

export type UpsertOneInput = CreateOneInput & UpdateOneInput;

const useCategories: UseItems<Category, CreateOneInput, UpdateOneInput> = (
  opts: UseItemsOptions = defaultOptions
) => {
  const apiRoutes = ApiRoutes.Categories;
  const useItemsHook = useItems<Category, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
  return useItemsHook;
};

export default useCategories;
