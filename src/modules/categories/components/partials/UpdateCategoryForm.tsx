import { RHFTextField } from '@common/components/lib/react-hook-form';
import UpdateCrudItemForm from '@common/components/partials/UpdateCrudItemForm';
import Routes from '@common/defs/routes';
import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import useCategories, { UpdateOneInput } from '@modules/categories/hooks/api/useCategory';
import { Category } from '@modules/categories/defs/types';

interface UpdateCaragoryFormProps {
  item: Category;
}

const UpdateCategoryForm = (props: UpdateCaragoryFormProps) => {
  const { item } = props;
  const { t } = useTranslation(['common']);
  const schema = Yup.object().shape({
    name: Yup.string().required(t('common:field_required')),
  });
  const defaultValues: UpdateOneInput = {
    name: item.name,
  };
  return (
    <>
      <UpdateCrudItemForm<Category, UpdateOneInput>
        item={item}
        routes={Routes.Users}
        useItems={useCategories}
        schema={schema}
        defaultValues={defaultValues}
      >
        <Grid container sx={{ padding: 6, justifyContent: 'center' }}>
          <Grid item md={8} xs={12}>
            <RHFTextField name="name" label="Nom" />
          </Grid>
        </Grid>
      </UpdateCrudItemForm>
    </>
  );
};

export default UpdateCategoryForm;
