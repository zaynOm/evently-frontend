import { useDialogContext } from '@common/contexts/DialogContext';
import routes from '@common/defs/routes';
import { CRUD_ACTION, Id } from '@common/defs/types';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { Event } from '@modules/events/defs/types';
import useEvents from '@modules/events/hooks/api/useEvents';
import usePermissions from '@modules/permissions/hooks/usePermissions';
import { AccessTime, CalendarToday, LocationOn } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import router from 'next/router';

interface IEventGridProps {
  event: Event;
  namespace: string;
  fetchEvents: () => Promise<void>;
}

const EventGridItem = (props: IEventGridProps) => {
  const { event, namespace, fetchEvents } = props;
  const { deleteOne, joinEvent, leaveEvent } = useEvents();
  const { openConfirmDialog } = useDialogContext();
  const { can } = usePermissions();
  const { user } = useAuth();
  const isFull = event.capacity === event.participantsCount;
  const isOwner = user?.id === event.hostId;
  const canJoin = !isOwner && !event.isParticipant && !isFull;
  const canLeave = !isOwner && event.isParticipant;

  const canUpdate = (id: Id) => {
    return can(namespace, CRUD_ACTION.UPDATE) || can(namespace, CRUD_ACTION.UPDATE, id);
  };

  const canDelete = (id: Id) => {
    return can(namespace, CRUD_ACTION.DELETE) || can(namespace, CRUD_ACTION.DELETE, id);
  };

  const handleJoin = async () => {
    await joinEvent(event.id, { displayProgress: true, displaySuccess: true });
    fetchEvents();
  };

  const handleLeave = async () => {
    await leaveEvent(event.id, { displayProgress: true, displaySuccess: true });
    fetchEvents();
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        backgroundColor: (theme) => (isFull ? theme.palette.action.disabledBackground : ''),
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <CardHeader
        title={event.title}
        subheader={event.description}
        titleTypographyProps={{
          sx: {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
          },
        }}
        subheaderTypographyProps={{
          sx: {
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            height: '3em',
          },
        }}
      />
      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
          <Typography variant="body2" color="text.secondary">
            {event.hostName}
          </Typography>
          <Chip
            label={isFull ? 'Full' : `${event.participantsCount} / ${event.capacity}`}
            color={isFull ? 'info' : 'default'}
          />
        </Stack>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarToday fontSize="small" color="action" />
            <Typography variant="body2">{dayjs(event.date).format('MMM D, YYYY')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTime fontSize="small" color="action" />
            <Typography variant="body2">{dayjs(event.time, 'HH:mm:ss').format('HH:mm')}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn fontSize="small" color="action" />
            <Typography variant="body2">{event.location}</Typography>
          </Box>
        </Stack>
      </CardContent>
      <CardActions
        sx={{
          mt: 'auto',
          p: 2,
        }}
      >
        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          justifyContent={{ xs: 'center', sm: 'space-between' }}
          spacing={1}
          flexGrow={1}
        >
          {isOwner ? (
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              {canUpdate(event.id) && (
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() =>
                    router.push(routes.Events.UpdateOne.replace('{id}', event.id.toString()))
                  }
                >
                  Edit
                </Button>
              )}
              {canDelete(event.id) && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    openConfirmDialog(
                      'Delete',
                      'Are you sure you want to delete this item? This action is irreversible.',
                      () => {
                        deleteOne(event.id, { displayProgress: true, displaySuccess: true });
                        fetchEvents();
                      },
                      'Delete',
                      'error'
                    );
                  }}
                >
                  Delete
                </Button>
              )}
            </Stack>
          ) : (
            <>
              {canJoin && (
                <Button variant="contained" onClick={handleJoin}>
                  Join
                </Button>
              )}
              {canLeave && (
                <Button variant="contained" onClick={handleLeave}>
                  Leave
                </Button>
              )}
            </>
          )}
          <Button
            color="primary"
            variant="outlined"
            onClick={() => router.push(routes.Events.ReadOne.replace('{id}', event.id.toString()))}
          >
            View Details
          </Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default EventGridItem;
