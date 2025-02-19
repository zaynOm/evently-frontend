import { RHFTextField, RHFSelect } from '@common/components/lib/react-hook-form';
import RHFDatePicker from '@common/components/lib/react-hook-form/RHFDatePicker';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import Routes from '@common/defs/routes';
import { ItemResponse } from '@common/hooks/useItems';
import { Event } from '@modules/events/defs/types';
import useEvents, { CreateOneInput } from '@modules/events/hooks/api/useEvents';
import { Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';
import useCategories from '@modules/categories/hooks/api/useCategory';
import { formatEventFormData } from '@modules/events/defs/utils';
import { useTranslation } from 'react-i18next';

interface CreateEventFormProps {}

const CreateEventForm = (_props: CreateEventFormProps) => {
  const router = useRouter();
  const { t } = useTranslation(['event', 'common', 'category']);
  const { items: categoriesData } = useCategories({ fetchItems: true });
  const categories = categoriesData || [];
  const schema = Yup.object().shape({
    title: Yup.string().required('Le champ est obligatoire'),
    description: Yup.string().required('Le champ est obligatoire'),
    date: Yup.date().required('Le champ est obligatoire'),
    time: Yup.string().required('Le champ est obligatoire'),
    location: Yup.string().required('Le champ est obligatoire'),
    capacity: Yup.number().required('Le champ est obligatoire'),
    categoryId: Yup.number().not([-1], 'Select a category').required('Le champ est obligatoire'),
  });
  const defaultValues: CreateOneInput = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: 0,
    categoryId: -1,
  };
  const onPreSubmit = formatEventFormData;

  const onPostSubmit = async (
    _data: CreateOneInput,
    response: ItemResponse<Event>,
    _methods: UseFormReturn<CreateOneInput>
  ) => {
    if (response.success) {
      router.push(Routes.Events.ReadAll);
    }
  };

  return (
    <>
      <CreateCrudItemForm<Event, CreateOneInput>
        routes={Routes.Events}
        useItems={useEvents}
        schema={schema}
        defaultValues={defaultValues}
        onPostSubmit={onPostSubmit}
        onPreSubmit={onPreSubmit}
      >
        <Grid container spacing={3} sx={{ padding: 6 }}>
          <Grid item xs={6}>
            <RHFTextField name="title" label={t('event:list.title')} />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name="description" label={t('event:list.description')} />
          </Grid>
          <Grid item xs={6}>
            <RHFDatePicker name="date" label={t('event:list.date')} />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name="time" label={t('event:list.time')} type="time" />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name="location" label={t('event:list.location')} />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name="capacity" label={t('event:list.capacity')} type="number" />
          </Grid>
          <Grid item xs={6}>
            <RHFSelect name="categoryId" label={t('category:common:category')}>
              <MenuItem value={-1}>{t('category:common.select_a_category')}</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
        </Grid>
      </CreateCrudItemForm>
    </>
  );
};

export default CreateEventForm;
