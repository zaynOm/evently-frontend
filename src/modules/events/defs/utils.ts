import { PresubmitResponse } from '@common/components/partials/UpsertCrudItemForm';
import { Any } from '@common/defs/types';
import { CreateOneInput, UpdateOneInput } from '@modules/events/hooks/api/useEvents';
import dayjs from 'dayjs';

export const formatEventFormData = <T extends CreateOneInput | UpdateOneInput>(
  data: T
): PresubmitResponse<T, Any> => {
  return {
    data: {
      ...data,
      date: dayjs(data.date).format('YYYY-MM-DD'),
    },
  };
};
