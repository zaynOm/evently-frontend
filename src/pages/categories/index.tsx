import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import PageHeader from '@common/components/lib/partials/PageHeader';
import Labels from '@common/defs/labels';
import Namespaces from '@common/defs/namespaces';
import Routes from '@common/defs/routes';
import { CRUD_ACTION } from '@common/defs/types';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import CategoriesTable from '@modules/categories/components/partials/CategoriesTable';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { Add } from '@mui/icons-material';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const CategoriesPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation(['category']);
  return (
    <>
      <PageHeader
        title={t(`category:${Labels.Categories.ReadAll}`)}
        action={{
          label: t(`category:${Labels.Categories.NewOne}`),
          startIcon: <Add />,
          onClick: () => router.push(Routes.Categories.CreateOne),
          permission: {
            entity: Namespaces.Categories,
            action: CRUD_ACTION.CREATE,
          },
        }}
      />
      <CustomBreadcrumbs
        links={[
          { name: t('common:dashboard'), href: Routes.Common.Home },
          { name: t(`category:${Labels.Categories.Items}`) },
        ]}
      />
      <CategoriesTable />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'topbar',
      'footer',
      'leftbar',
      'user',
      'common',
      'category',
    ])),
  },
});

export default withAuth(
  withPermissions(CategoriesPage, {
    requiredPermissions: {
      entity: Namespaces.Categories,
      action: CRUD_ACTION.READ,
    },
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
