import { Event } from '@modules/events/defs/types';
import { AccessTime, CalendarToday, LocationOn } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

interface IEventGridProps {
  event: Event;
}

const EventGridItem = (props: IEventGridProps) => {
  const { event } = props;
  const isFull = event.capacity === event.participantsCount;
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
            color={isFull ? 'error' : 'success'}
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
        >
    </Card>
  );
};

export default EventGridItem;
