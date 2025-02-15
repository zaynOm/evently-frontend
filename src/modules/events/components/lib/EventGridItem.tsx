import { Event } from '@modules/events/defs/types';
import { AccessTime, CalendarToday, LocationOn } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';

interface IEventGridProps {
  event: Event;
}

const EventGridItem = (props: IEventGridProps) => {
  const { event } = props;
  return (
    <Grid item xs={4} key={event.id}>
      <Card
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease-in-out',
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {event.hostName}
            </Typography>
            <Typography variant="body2">
              {event.participantsCount}/{event.capacity}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarToday fontSize="small" color="action" />
              <Typography variant="body2">
                {dayjs(new Date(event.date)).format('DD/MM/YYYY')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTime fontSize="small" color="action" />
              <Typography variant="body2">
                {dayjs(event.time, 'HH:mm:ss').format('HH:mm')}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocationOn fontSize="small" color="action" />
              <Typography variant="body2">{event.location}</Typography>
            </Box>
          </Stack>
        </CardContent>
        <CardActionArea
          sx={{
            mt: 'auto',
            p: 2,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Chip label="View Details" color="primary" variant="outlined" />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default EventGridItem;
