import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { NextPage } from 'next';
import Routes from '@common/defs/routes';
import PageHeader from '@common/components/lib/partials/PageHeader';
import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import { CRUD_ACTION } from '@common/defs/types';
import Namespaces from '@common/defs/namespaces';
import Labels from '@common/defs/labels';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import CreateCategoryForm from '@modules/categories/components/partials/CreateCategoryForm';

const CategoriesPage: NextPage = () => {
  const { t } = useTranslation(['category', 'common']);

  return (
    <>
      <PageHeader title={t(`category:${Labels.Categories.CreateNewOne}`)} />
      <CustomBreadcrumbs
        links={[
          { name: t('common:dashboard'), href: Routes.Common.Home },
          { name: t(`category:${Labels.Categories.Items}`), href: Routes.Categories.ReadAll },
          { name: t(`category:${Labels.Categories.NewOne}`) },
        ]}
      />
      <CreateCategoryForm />
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
      'category',
      'common',
    ])),
  },
});

export default withAuth(
  withPermissions(CategoriesPage, {
    requiredPermissions: {
      entity: Namespaces.Categories,
      action: CRUD_ACTION.CREATE,
    },
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
