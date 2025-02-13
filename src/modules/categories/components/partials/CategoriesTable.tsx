import ItemsTable from '@common/components/partials/ItemsTable';
import Namespaces from '@common/defs/namespaces';
import Routes from '@common/defs/routes';
import { CrudRow } from '@common/defs/types';
import { Category } from '@modules/categories/defs/types';
import useCategories, {
  CreateOneInput,
  UpdateOneInput,
} from '@modules/categories/hooks/api/useCategory';
import { GridColumns } from '@mui/x-data-grid-premium';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Row extends CrudRow {
  name: string;
  slug: string;
}

const CategoriesTable = () => {
  const { t, i18n } = useTranslation(['category']);
  const columns: GridColumns<Row> = [
    {
      field: 'id',
      headerName: 'ID',
      width: 100,
    },
    {
      field: 'name',
      headerName: t('category:list.name'),
      flex: 1,
    },
    {
      field: 'slug',
      headerName: t('category:list.slug'),
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: t('category:list.created_at'),
      type: 'dateTime',
      flex: 1,
      renderCell: (params) => dayjs(params.row.createdAt).format('DD/MM/YYYY hh:mm'),
    },
  ];
  const [translatedColumns, setTranslatedColumns] = useState<GridColumns<Row>>(columns);

  useEffect(() => {
    setTranslatedColumns(columns);
  }, [t, i18n.language]);

  const itemToRow = (item: Category): Row => {
    return {
      id: item.id,
      name: item.name,
      slug: item.slug,
      createdAt: item.createdAt,
    };
  };

  return (
    <>
      <ItemsTable<Category, CreateOneInput, UpdateOneInput, Row>
        namespace={Namespaces.Users}
        routes={Routes.Users}
        useItems={useCategories}
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

export default CategoriesTable;
