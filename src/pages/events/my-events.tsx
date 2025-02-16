import CustomBreadcrumbs from '@common/components/lib/navigation/CustomBreadCrumbs';
import PageHeader from '@common/components/lib/partials/PageHeader';
import Labels from '@common/defs/labels';
import Namespaces from '@common/defs/namespaces';
import Routes from '@common/defs/routes';
import { CRUD_ACTION } from '@common/defs/types';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import UserEvents from '@modules/events/components/partials/UserEvents';
import withPermissions from '@modules/permissions/hocs/withPermissions';
import { Add } from '@mui/icons-material';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const EventsPage: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation(['event']);

  return (
    <>
      <PageHeader
        title={t(`event:${Labels.Events.ReadAll}`)}
        action={{
          label: t(`event:${Labels.Events.NewOne}`),
          startIcon: <Add />,
          onClick: () => router.push(Routes.Events.CreateOne),
          permission: {
            entity: Namespaces.Events,
            action: CRUD_ACTION.CREATE,
          },
        }}
      />
      <CustomBreadcrumbs
        links={[
          { name: t('common:dashboard'), href: Routes.Common.Home },
          { name: t(`event:${Labels.Events.Items}`) },
        ]}
      />
      <UserEvents />
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
      'event',
    ])),
  },
});

export default withAuth(
  withPermissions(EventsPage, {
    requiredPermissions: {
      entity: Namespaces.Events,
      action: CRUD_ACTION.READ,
    },
    redirectUrl: Routes.Permissions.Forbidden,
  }),
  { mode: AUTH_MODE.LOGGED_IN, redirectUrl: Routes.Auth.Login }
);
