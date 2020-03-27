import React, { useEffect } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStores } from '../../core/hooks/use-stores';
import { observer } from 'mobx-react-lite';
import { TitleBar } from '../../core/components/TitleBar';
import moment from 'moment';
import { RoomAmountPair } from '../../core/stores/booking';
import { BackendAPI } from '../../core/repository/api/backend';
import { FormText } from '../../core/components/Forms/FormText';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    main: {
      marginBottom: theme.spacing(2),
    },
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    noLineHeight: {
      verticalAlign: 'middle',
    },
    bold: {
      fontWeight: 'bold',
    },
    button: {
      width: '100%',
      padding: theme.spacing(2),
    },
    priceText: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
    },
  })
);

export const ConfirmBooking: React.FC = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const { authStore, bookingStore } = useStores();
  const bookingInfo = bookingStore.roomSearchInfo;
  const searchResults = bookingStore.searchResults;
  const selectedRooms = bookingStore.selectedRooms;
  useEffect(() => {
    if (!searchResults) {
      bookingStore.fetchSearchResults();
    }
  }, [bookingStore, searchResults]);

  const bookedRooms = searchResults
    ? searchResults
        .map(roomType => {
          const { type, price } = roomType;
          return {
            type,
            price,
            selected: roomType.availability
              .filter(room => selectedRooms.find(s => s.room === room.id))
              .map(
                room =>
                  selectedRooms.find(s => s.room === room.id) as RoomAmountPair
              ),
          };
        })
        .filter(bookedRooms => bookedRooms.selected.length > 0)
    : [];

  const reserve = async () => {
    const reservation = await BackendAPI.reserve({
      checkIn: moment(bookingInfo?.checkIn).format('YYYY-MM-DD'),
      checkOut: moment(bookingInfo?.checkOut).format('YYYY-MM-DD'),
      rooms: selectedRooms.map(room => ({
        id: room.room,
        guests: room.amount,
      })),
      specialRequests: bookingStore.specialRequests || '',
    });
    console.log(reservation);
  };
  return (
    <>
      <TitleBar
        title="Confirmation"
        onBack={() => history.push('/search/result')}
      />
      <Container maxWidth="md" className={classes.root}>
        <Card className={classes.main}>
          <CardContent>
            <Typography variant="body1">
              {moment(bookingInfo?.checkIn).format('DD MMMM YYYY')} -{' '}
              {moment(bookingInfo?.checkOut).format('DD MMMM YYYY')}
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="h6" gutterBottom={true}>
              Selected Rooms
            </Typography>
            {bookedRooms.map(room => {
              return (
                <Box
                  key={'booked-room-' + room.type}
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                >
                  <Typography
                    variant="body1"
                    component="span"
                    className={classes.noLineHeight}
                  >
                    {room.selected.reduce((p, r) => p + r.amount, 0)} x{' '}
                    {room.type} ({room.price} THB)
                  </Typography>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => history.push('/search/rooms/' + room.type)}
                  >
                    Change
                  </Button>
                </Box>
              );
            })}
            <Typography
              variant="body1"
              component="span"
              className={classes.bold}
              gutterBottom={false}
            >
              Total :{' '}
              {bookedRooms.reduce(
                (p, c) => p + c.selected.reduce((p, r) => p + r.amount, 0),
                0
              )}{' '}
              Beds
            </Typography>
            <Divider className={classes.divider} />
            <Typography
              variant="body1"
              color="primary"
              className={classes.bold}
            >
              Free cancellation before 23:59, {moment().format('DD MMMM YYYY')}{' '}
              (GMT+7)
            </Typography>
            <Divider className={classes.divider} />
            {/* <Typography variant="h6">Special Requests</Typography> */}
            <FormText
              id="speicalRequests"
              name="specialRequests"
              variant="outlined"
              label="Special Requests (Optional)"
              value={bookingStore.specialRequests}
              onChange={(e: any) =>
                bookingStore.setSpecialRequests(e.target.value)
              }
              multiline
              marginBottom={false}
            />
          </CardContent>
        </Card>
        <Box display="flex" justifyContent="center" padding={2}>
          <Typography variant="h4" className={classes.priceText}>
            {bookedRooms.reduce(
              (p, c) =>
                p + c.price * c.selected.reduce((p, r) => p + r.amount, 0),
              0
            )}{' '}
            THB (tax included)
          </Typography>
        </Box>
        {authStore.isAuthenticated ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => reserve()}
          >
            Go to Payment
          </Button>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            textAlign="center"
            flexDirection="column"
          >
            <Typography variant="body1" gutterBottom>
              You're not logged in
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={() => history.push('/login?returnTo=/confirm')}
            >
              Login
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
});
