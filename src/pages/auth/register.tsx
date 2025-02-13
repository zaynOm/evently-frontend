import { NextPage } from 'next';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import Routes from '@common/defs/routes';
import RegisterForm from '@modules/auth/components/pages/RegisterForm';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const RegisterPage: NextPage = () => {
  return (
    <>
      <RegisterForm />
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'sign-in', 'common'])),
  },
});

export default withAuth(RegisterPage, {
  mode: AUTH_MODE.LOGGED_OUT,
  redirectUrl: Routes.Common.Home,
});
