import { RHFTextField } from '@common/components/lib/react-hook-form';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import Routes from '@common/defs/routes';
import { ItemResponse } from '@common/hooks/useItems';
import { Category } from '@modules/categories/defs/types';
import useCategories, { CreateOneInput } from '@modules/categories/hooks/api/useCategory';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';

interface CreateCategoryFormProps {}

const CreateCategoryForm = (_props: CreateCategoryFormProps) => {
  const router = useRouter();
  const schema = Yup.object().shape({
    name: Yup.string().required('Le champ est obligatoire'),
  });
  const defaultValues: CreateOneInput = {
    name: '',
  };
  const onPostSubmit = async (
    _data: CreateOneInput,
    response: ItemResponse<Category>,
    _methods: UseFormReturn<CreateOneInput>
  ) => {
    if (response.success) {
      router.push(Routes.Categories.ReadAll);
    }
  };
  return (
    <>
      <CreateCrudItemForm<Category, CreateOneInput>
        routes={Routes.Categories}
        useItems={useCategories}
        schema={schema}
        defaultValues={defaultValues}
        onPostSubmit={onPostSubmit}
      >
        <Grid container sx={{ padding: 6, justifyContent: 'center' }}>
          <Grid item md={8} xs={12}>
            <RHFTextField name="name" label="Nom" />
          </Grid>
        </Grid>
      </CreateCrudItemForm>
    </>
  );
};

export default CreateCategoryForm;
