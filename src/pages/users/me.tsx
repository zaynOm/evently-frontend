import { NextPage } from 'next';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import Routes from '@common/defs/routes';
import { Box, Card, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PageHeader from '@common/components/lib/partials/PageHeader';
import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { LockOpen } from '@mui/icons-material';
import useUsers, { UpdateOneInput } from '@modules/users/hooks/api/useUsers';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ROLE } from '@modules/permissions/defs/types';
import { useTranslation } from 'react-i18next';

const MyProfile: NextPage = () => {
  const { user } = useAuth();
  const { updateOne } = useUsers({ fetchItems: user?.rolesNames[0] === ROLE.ADMIN });
  const { t } = useTranslation(['common']);

  const ProfileSchema = Yup.object().shape({
    fullName: Yup.string().max(255, 'Le champ est trop long.').required('Le champ est obligatoire'),
    email: Yup.string()
      .max(191, 'Le champ est trop long.')
      .email("Le format de l'email est incorrect")
      .required("L'email est obligatoire"),
    password: Yup.string().max(191, 'Le champ est trop long.'),
  });

  const methods = useForm<UpdateOneInput>({
    resolver: yupResolver(ProfileSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      password: '',
      role: user?.rolesNames[0],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data: UpdateOneInput) => {
    if (!user) {
      return;
    }
    await updateOne(user.id, data, { displayProgress: true, displaySuccess: true });
  };
  return (
    <>
      <Box sx={{ marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
        <PageHeader title={t('topbar:my_profile')} />
      </Box>
      <Card sx={{ maxWidth: '500px', margin: 'auto' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container rowSpacing={3} columnSpacing={2} sx={{ padding: 5 }}>
            <Grid item xs={12}>
              <RHFTextField name="fullName" label={t('common:full_name')} />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="email" label={t('common:email')} />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="password" label={t('common:change_password')} type="password" />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <LoadingButton
                size="large"
                variant="contained"
                type="submit"
                startIcon={<LockOpen />}
                loadingPosition="start"
                loading={isSubmitting}
              >
                {t('common:update_details')}
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['topbar', 'footer', 'leftbar', 'user', 'common'])),
  },
});

export default withAuth(MyProfile, { mode: AUTH_MODE.LOGGED_IN, redirectUrl: Routes.Auth.Login });
