import ItemsTable from '@common/components/partials/ItemsTable';
import Namespaces from '@common/defs/namespaces';
import Routes from '@common/defs/routes';
import { CrudRow } from '@common/defs/types';
import { Event } from '@modules/events/defs/types';
import useEvents, { CreateOneInput, UpdateOneInput } from '@modules/events/hooks/api/useEvents';
import { GridColumns } from '@mui/x-data-grid-premium';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Row extends CrudRow {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  participantsCount: number;
  hostId: number;
  categoryId: number;
  createdAt: string;
}

const EventsTable = () => {
  const { t, i18n } = useTranslation(['event']);
  const columns: GridColumns<Row> = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'title',
      headerName: t('event:list.title'),
      flex: 1,
    },
    {
      field: 'description',
      headerName: t('event:list.description'),
      flex: 1,
    },
    {
      field: 'date',
      headerName: t('event:list.date'),
      flex: 1,
      renderCell: (params) => dayjs(params.row.date).format('DD/MM/YYYY'),
    },
    {
      field: 'time',
      headerName: t('event:list.time'),
      width: 70,
      renderCell: (params) => dayjs(params.row.time, 'HH:mm:ss').format('HH:mm'),
    },
    {
      field: 'location',
      headerName: t('event:list.location'),
      flex: 1,
    },
    {
      field: 'capacity',
      headerName: t('event:list.capacity'),
      flex: 1,
    },
    {
      field: 'participantsCount',
      headerName: t('event:list.participants_count'),
      flex: 1,
    },
    {
      field: 'hostId',
      headerName: t('event:list.host_id'),
      flex: 1,
    },
    {
      field: 'categoryId',
      headerName: t('event:list.category_id'),
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: t('event:list.created_at'),
      type: 'dateTime',
      minWidth: 130,
      flex: 1,
      renderCell: (params) => dayjs(params.row.createdAt).format('DD/MM/YYYY hh:mm'),
    },
  ];
  const [translatedColumns, setTranslatedColumns] = useState<GridColumns<Row>>(columns);

  useEffect(() => {
    setTranslatedColumns(columns);
  }, [t, i18n.language]);

  const itemToRow = (item: Event): Row => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      date: item.date,
      time: item.time,
      location: item.location,
      capacity: item.capacity,
      participantsCount: item.participantsCount,
      hostId: item.hostId,
      categoryId: item.categoryId,
      createdAt: item.createdAt,
    };
  };

  return (
    <>
      <ItemsTable<Event, CreateOneInput, UpdateOneInput, Row>
        namespace={Namespaces.Events}
        routes={Routes.Events}
        useItems={useEvents}
        columns={translatedColumns}
        itemToRow={itemToRow}
        showEdit={() => true}
        showDelete={() => true}
        showLock
        exportable
      />
    </>
  );
};

export default EventsTable;
