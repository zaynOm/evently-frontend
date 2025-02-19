import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
import { LockOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import useAuth, { RegisterInput } from '@modules/auth/hooks/api/useAuth';
import Link from '@mui/material/Link';
import Routes from '@common/defs/routes';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

const RegisterForm = () => {
  const { register } = useAuth();
  const { t } = useTranslation(['common']);

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().max(255, 'Le champ est trop long.').required('Le champ est obligatoire'),
    email: Yup.string()
      .email("Le format de l'email est incorrect")
      .max(191, 'Le champ est trop long.')
      .required('Le champ est obligatoire'),
    password: Yup.string().max(191, 'Le champ est trop long.').required('Le champ est obligatoire'),
  });

  const methods = useForm<RegisterInput>({
    resolver: yupResolver(RegisterSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = async (data: RegisterInput) => {
    await register(
      {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
      },
      { displayProgress: true, displaySuccess: true }
    );
  };
  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        sx={{
          marginTop: 2,
          marginBottom: 2,
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {t('common:register')}
      </Typography>
      <Card sx={{ maxWidth: '450px', margin: 'auto' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4} sx={{ padding: 5 }}>
            <Grid item xs={12}>
              <RHFTextField name="fullName" label={t('common:full_name')} />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="email" label={t('common:email')} />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField name="password" label={t('common:password')} type="password" />
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
                {t('common:register')}
              </LoadingButton>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {t('common:already_registered')}{' '}
                <Link href={Routes.Auth.Login}>{t('topbar:login')}</Link>
              </Typography>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </>
  );
};

export default RegisterForm;
