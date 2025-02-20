import { Event } from '@modules/events/defs/types';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { CalendarToday, LocationOn, Person } from '@mui/icons-material';
import dayjs from 'dayjs';
import Routes from '@common/defs/routes';
import { useRouter } from 'next/router';
import { useDialogContext } from '@common/contexts/DialogContext';
import useAuth from '@modules/auth/hooks/api/useAuth';
import useEvents from '@modules/events/hooks/api/useEvents';
import { useTranslation } from 'react-i18next';

interface IEventDetailsProps {
  item: Event;
  fetchEvent: () => void;
}

const EventDetails = (props: IEventDetailsProps) => {
  const { item, fetchEvent } = props;
  const { t } = useTranslation(['event', 'common']);
  const router = useRouter();
  const { joinEvent, leaveEvent, deleteOne } = useEvents();
  const { user } = useAuth();
  const { openConfirmDialog } = useDialogContext();

  const isOwner = user?.id === item.hostId;
  const isFull = item.participantsCount === item.capacity;
  const canJoin = !isOwner && !item.isParticipant && !isFull;
  const canLeave = !isOwner && item.isParticipant;

  const handleJoin = async () => {
    await joinEvent(item.id, { displayProgress: true, displaySuccess: true });
    fetchEvent();
  };

  const handleLeave = async () => {
    await leaveEvent(item.id, { displayProgress: true, displaySuccess: true });
    fetchEvent();
  };

  const handleDelete = () => {
    openConfirmDialog(
      t('common:delete'),
      t('common:confirm_delete'),
      () => {
        deleteOne(item.id, { displayProgress: true, displaySuccess: true }).then(() => {
          router.push(Routes.Events.ReadAll);
        });
      },
      t('common:delete'),
      'error'
    );
  };

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              {item.title}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {t('event:list:description')}
            </Typography>
            <Typography variant="body1" paragraph>
              {item.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday color="action" />
                <Typography>
                  {dayjs(item.date).format('MMM D, YYYY')} at{' '}
                  {dayjs(item.time, 'HH:mm:ss').format('HH:mm')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn color="action" />
                <Typography>{item.location}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Person color="action" />
                <Typography>
                  {item.participantsCount} / {item.capacity} {t('event:list:participants_count')}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {t('event:status')}
                </Typography>
                <Stack spacing={2}>
                  <Chip
                    label={
                      isFull
                        ? t('event:common:event_full')
                        : `${item.capacity - item.participantsCount} 
                            ${
                              item.capacity - item.participantsCount === 1
                                ? t('event:common:spot_left')
                                : t('event:common:spots_left')
                            }`
                    }
                    color={isFull ? 'info' : 'default'}
                  />
                  <Stack spacing={1}>
                    {canJoin && (
                      <Button variant="contained" color="primary" onClick={handleJoin} fullWidth>
                        Join Event
                      </Button>
                    )}
                    {canLeave && (
                      <Button variant="outlined" color="primary" onClick={handleLeave} fullWidth>
                        Leave Event
                      </Button>
                    )}
                    {isOwner && (
                      <>
                        <Button
                          variant="outlined"
                          color="inherit"
                          onClick={() =>
                            router.push(Routes.Events.UpdateOne.replace('{id}', item.id.toString()))
                          }
                          fullWidth
                        >
                          {t('common:edit')}
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleDelete} fullWidth>
                          {t('common:delete')}
                        </Button>
                      </>
                    )}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EventDetails;
