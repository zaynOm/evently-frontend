import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Footer from './Footer';
import Leftbar, { LEFTBAR_WIDTH } from './Leftbar';
import Topbar from './Topbar';
import Box from '@mui/material/Box';
import { Container, useTheme, Button, Typography, Theme } from '@mui/material';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTranslation } from 'react-i18next';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { ROLE } from '@modules/permissions/defs/types';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = (props: ILayoutProps) => {
  const { children } = props;
  const theme = useTheme();
  const [openLeftbar, setOpenLeftbar] = useState(true);
  const [display, setDisplay] = useState(true);
  const underMaintenance = process.env.NEXT_PUBLIC_UNDER_MAINTENANCE === 'true';
  const { t } = useTranslation('common');
  const { user } = useAuth();

  useEffect(() => {
    setDisplay(!underMaintenance);
  }, [underMaintenance]);

  if (!display) {
    return (
      <Box
        id="webview-container"
        sx={{
          height: '100%',
          backgroundColor: 'common.white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ padding: 1 }}>
          <Typography textAlign="center" marginBottom={2}>
            {t('maintenance_message')}
          </Typography>
          <Typography textAlign="center" marginBottom={2}>
            {t('maintenance_thanks')}
          </Typography>
          <Button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: 55,
              fontWeight: 500,
              borderRadius: '4px',
              fontFamily: 'Raleway',
              backgroundColor: '#ff7b00',
              color: 'white',
              fontSize: 16,
              gap: '8px',
              marginTop: '24px',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingLeft: '20px',
              paddingRight: '20px',
            }}
            onClick={() => {
              window.history.back();
            }}
          >
            <ArrowBackIcon />
            {t('return')}
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <div>
      <Head>
        <title>{process.env.NEXT_PUBLIC_APP_TITLE}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Box
        sx={{
          display: 'flex',
        }}
      >
        {user?.rolesNames.includes(ROLE.ADMIN) ? (
          <BaseLayout
            theme={theme}
            leftbar={<Leftbar open={openLeftbar} onToggle={(open) => setOpenLeftbar(open)} />}
            leftbarWidth={openLeftbar ? LEFTBAR_WIDTH : 0}
          >
            {children}
          </BaseLayout>
        ) : (
          <BaseLayout theme={theme}>{children}</BaseLayout>
        )}
      </Box>
    </div>
  );
};

interface IBaseLayoutProps {
  children: React.ReactNode;
  theme: Theme;
  leftbar?: React.ReactNode;
  leftbarWidth?: number;
}

const BaseLayout = ({ children, theme, leftbar = null, leftbarWidth = 0 }: IBaseLayoutProps) => {
  return (
    <Box sx={{ minHeight: '100vh', width: '100vw' }}>
      <Stack direction="column" sx={{ height: '100%' }}>
        {leftbar}
        <Topbar />
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            marginLeft: leftbarWidth > 0 ? `${leftbarWidth}px` : 0,
            width: leftbarWidth > 0 ? `calc(100% - ${leftbarWidth}px)` : '100%',
          }}
        >
          <Container
            sx={{
              flex: 1,
              paddingY: 6,
              transition: theme.transitions.create(['all'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            }}
          >
            <Box component="main" sx={{}}>
              {children}
            </Box>
          </Container>
        </Box>
        <Box
          sx={{
            marginLeft: leftbarWidth > 0 ? `${leftbarWidth}px` : 0,
            maxWidth: leftbarWidth > 0 ? `calc(100% - ${leftbarWidth}px)` : '100%',
            transition: theme.transitions.create(['all'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Footer />
        </Box>
      </Stack>
    </Box>
  );
};

export default Layout;
