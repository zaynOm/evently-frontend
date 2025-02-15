import { RHFTextField, RHFSelect } from '@common/components/lib/react-hook-form';
import RHFDatePicker from '@common/components/lib/react-hook-form/RHFDatePicker';
import Routes from '@common/defs/routes';
import { ItemResponse } from '@common/hooks/useItems';
import { Event } from '@modules/events/defs/types';
import useEvents, { UpdateOneInput } from '@modules/events/hooks/api/useEvents';
import { Grid, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { UseFormReturn } from 'react-hook-form';
import * as Yup from 'yup';
import useCategories from '@modules/categories/hooks/api/useCategory';
import dayjs from 'dayjs';
import UpdateCrudItemForm from '@common/components/partials/UpdateCrudItemForm';
import { formatEventFormData } from '@modules/events/defs/utils';

interface UpdateEventFormProps {
  item: Event;
}

const UpdateEventForm = (props: UpdateEventFormProps) => {
  const { item } = props;
  const router = useRouter();
  const { items: categories } = useCategories({ fetchItems: true });
  const schema = Yup.object().shape({
    title: Yup.string().required('Le champ est obligatoire'),
    description: Yup.string().required('Le champ est obligatoire'),
    date: Yup.date().required('Le champ est obligatoire'),
    time: Yup.string().required('Le champ est obligatoire'),
    location: Yup.string().required('Le champ est obligatoire'),
    capacity: Yup.number().required('Le champ est obligatoire'),
    categoryId: Yup.number().required('Le champ est obligatoire'),
  });
  const defaultValues: UpdateOneInput = {
    title: item.title,
    description: item.description,
    date: dayjs(item.date),
    time: item.time,
    location: item.location,
    capacity: item.capacity,
    categoryId: item.categoryId,
  };
  const onPreSubmit = formatEventFormData;

  const onPostSubmit = async (
    _data: UpdateOneInput,
    response: ItemResponse<Event>,
    _methods: UseFormReturn<UpdateOneInput>
  ) => {
    if (response.success) {
      router.push(Routes.Events.ReadAll);
    }
  };

  return (
    <>
      <UpdateCrudItemForm<Event, UpdateOneInput>
        item={item}
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
            <RHFSelect name="categoryId" label="Category">
              {categories?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </RHFSelect>
          </Grid>
        </Grid>
      </UpdateCrudItemForm>
    </>
  );
};

export default UpdateEventForm;
