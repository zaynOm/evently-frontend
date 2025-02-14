import { RHFTextField, RHFSelect } from '@common/components/lib/react-hook-form';
import RHFDatePicker from '@common/components/lib/react-hook-form/RHFDatePicker';
import CreateCrudItemForm from '@common/components/partials/CreateCrudItemForm';
import Routes from '@common/defs/routes';
import { ItemResponse } from '@common/hooks/useItems';
import { Event } from '@modules/events/defs/types';
import useEvents, { CreateOneInput, UpdateOneInput } from '@modules/events/hooks/api/useEvents';
import { Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';
import useCategories from '@modules/categories/hooks/api/useCategory';
import dayjs from 'dayjs';
import { PresubmitResponse } from '@common/components/partials/UpsertCrudItemForm';

interface CreateEventFormProps {}

const CreateEventForm = (_props: CreateEventFormProps) => {
  const router = useRouter();
  const { items: categoriesData } = useCategories({ fetchItems: true });
  const categories = categoriesData || [];
  const schema = Yup.object().shape({
    title: Yup.string().required('Le champ est obligatoire'),
    description: Yup.string().required('Le champ est obligatoire'),
    date: Yup.date().required('Le champ est obligatoire'),
    time: Yup.string().required('Le champ est obligatoire'),
    location: Yup.string().required('Le champ est obligatoire'),
    capacity: Yup.number().required('Le champ est obligatoire'),
    category_id: Yup.number().required('Le champ est obligatoire'),
  });
  const defaultValues: CreateOneInput = {
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: 0,
    category_id: 0,
  };
  const onPreSubmit = (data: CreateOneInput): PresubmitResponse<CreateOneInput, UpdateOneInput> => {
    if (data.date) {
      data.date = dayjs(data.date).format('YYYY-MM-DD');
    }
    return { data };
  };

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
            <RHFTextField name="title" label="Title" />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name="description" label="Description" />
          </Grid>
          <Grid item xs={6}>
            <RHFDatePicker name="date" label="Date" />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name="time" label="Time" type="time" />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name="location" label="Location" />
          </Grid>
          <Grid item xs={6}>
            <RHFTextField name="capacity" label="Capacity" type="number" />
          </Grid>
          <Grid item xs={6}>
            <RHFSelect name="category_id" label="Category">
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
