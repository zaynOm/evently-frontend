import ApiRoutes from '@common/defs/api-routes';
import Routes from '@common/defs/routes';
import useApi from '@common/hooks/useApi';
import palette from '@common/theme/palette';
import { Category, Event, People } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Stats {
  usersCount: number;
  eventsCount: number;
  categoriesCount: number;
  participantsCount: number;
}

const DashboardStats = () => {
  const { t } = useTranslation(['user', 'event', 'category']);
  const fetchApi = useApi();
  const [stats, setStats] = useState<Stats>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getStats = async () => {
      setLoading(true);
      const response = await fetchApi<Stats>(ApiRoutes.Stats);
      if (response.success) {
        setStats(response.data);
      }
      setLoading(false);
    };

    getStats();
  }, []);

  const handleCardClick = (route: string) => {
    router.push(route);
  };

  const statItems = [
    {
      title: t('user:common:items'),
      count: stats?.usersCount,
      icon: <People sx={{ fontSize: 56, color: palette.primary.dark }} />,
      route: Routes.Users.ReadAll,
    },
    {
      title: t('event:common:items'),
      count: stats?.eventsCount,
      icon: <Event sx={{ fontSize: 56, color: palette.primary.dark }} />,
      route: Routes.Events.ReadAll,
    },
    {
      title: t('category:common:items'),
      count: stats?.categoriesCount,
      icon: <Category sx={{ fontSize: 56, color: palette.primary.dark }} />,
      route: Routes.Categories.ReadAll,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {loading
          ? Array.from(Array(3)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Skeleton variant="rectangular" height={200} />
              </Grid>
            ))
          : statItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.title}>
                <Card
                  onClick={() => handleCardClick(item.route)}
                  sx={{
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardActionArea>
                    <CardContent sx={{ textAlign: 'center', py: 5 }}>
                      {item.icon}
                      <Typography variant="h3" component="div" sx={{ my: 2 }}>
                        {item.count}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        {item.title}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
      </Grid>
    </Container>
  );
};

export default DashboardStats;
