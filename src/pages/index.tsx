import PageHeader from '@common/components/lib/partials/PageHeader';
import Routes from '@common/defs/routes';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import { ROLE } from '@modules/permissions/defs/types';
import withRoles from '@modules/roles/hocs/withRoles';
import DashboardStats from '@modules/users/components/partials/DashboardStats';
import { NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

const Index: NextPage = () => {
  const { t } = useTranslation(['home']);
  return (
    <>
      <PageHeader title={t('home:dashboard')} />
      <DashboardStats />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      'topbar',
      'footer',
      'leftbar',
      'home',
      'user',
      'event',
      'category',
    ])),
  },
});
export default withAuth(
  withRoles(Index, { requiredRoles: ROLE.ADMIN, redirectUrl: Routes.Events.ReadAll }),
  {
    mode: AUTH_MODE.LOGGED_IN,
    redirectUrl: Routes.Auth.Login,
  }
);
