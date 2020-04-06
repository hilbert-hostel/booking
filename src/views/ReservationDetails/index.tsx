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
  Paper,
  List,
  ListItem,
  CardMedia,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useStores } from '../../core/hooks/use-stores';
import { observer } from 'mobx-react-lite';
import { TitleBar } from '../../core/components/TitleBar';
import moment from 'moment';
import { pluralize } from '../../core/utils/text-formatting';
import { CustomLink } from '../../core/components/CustomLink';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'stretch',
      alignItems: 'stretch',
      flexDirection: 'column',
      flexGrow: 1,
      height: '100%',
      marginBottom: theme.spacing(1),
    },
    main: {
      marginBottom: theme.spacing(2),
    },
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    card: {
      marginBottom: theme.spacing(2),
      height: '100%',
    },
    bold: {
      fontWeight: 'bold',
    },
    text: {
      color: theme.palette.text.primary,
    },
    button: {
      width: '100%',
      padding: theme.spacing(2),
    },
    priceText: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
      color: theme.palette.text.primary,
    },
    paperNoRound: {
      borderRadius: 0,
    },
    paymentNotCompleted: {
      color: theme.palette.error.contrastText,
      backgroundColor: theme.palette.error.main,
      padding: theme.spacing(2),
    },
    noPadding: {
      padding: 0,
    },
  })
);

export const ReservationDetails: React.FC = observer(() => {
  const classes = useStyles();
  const { id } = useParams();
  const { reservationStore } = useStores();
  const reservation = id
    ? reservationStore.findReservation(id || '')
    : undefined;

  useEffect(() => {
    if (id) {
      try {
        reservationStore.fetchReservations();
      } catch (error) {}
    }
  }, [id, reservationStore]);

  return (
    <>
      <Box
        alignItems="stretch"
        justifyContent="center"
        display="flex"
        minHeight="100%"
        flexDirection="column"
      >
        <TitleBar title="Reservation Details" backTo="/reservation" />
        <Container maxWidth="md" className={classes.container}>
          {reservation && (
            <>
              <Card className={classes.card}>
                {reservation.rooms[0].photos[0] && (
                  <CardMedia
                    component="img"
                    alt={
                      reservation.rooms[0].photos[0].photo_description ||
                      reservation.rooms[0].type
                    }
                    height="140"
                    image={reservation.rooms[0].photos[0].photo_url}
                    title={reservation.rooms[0].type}
                  />
                )}
                <CardContent>
                  <Typography variant="h5">
                    {moment(reservation.checkIn).format('DD MMMM YYYY')} -{' '}
                    {moment(reservation.checkOut).format('DD MMMM YYYY')}
                  </Typography>
                  <Divider className={classes.divider} />
                  <Typography variant="h6">
                    Booking ID : {reservation.id}
                  </Typography>
                  {/* <Typography variant="h6">Transaction ID : asdf</Typograsphy> */}
                  <Typography variant="h6">
                    {moment(reservation.checkOut).diff(
                      moment(reservation.checkIn),
                      'd'
                    )}{' '}
                    {pluralize(
                      'Day',
                      moment(reservation.checkOut).diff(
                        moment(reservation.checkIn),
                        'd'
                      )
                    )}
                    , {reservation.rooms.reduce((p, c) => p + c.beds, 0)}{' '}
                    {pluralize(
                      'Bed',
                      reservation.rooms.reduce((p, c) => p + c.beds, 0)
                    )}
                  </Typography>
                  <Typography variant="h6">
                    Special Request : {reservation.specialRequests || '-'}
                  </Typography>
                  <Typography variant="h6">Rooms :</Typography>
                  <List className={classes.noPadding}>
                    {reservation.rooms.map(c => {
                      return (
                        <ListItem
                          className={classes.noPadding}
                          key={'room-' + c.id}
                        >
                          <Typography variant="h6">
                            - {c.type} (room no. {c.id}) : {c.beds}{' '}
                            {pluralize('bed', c.beds)}
                          </Typography>
                        </ListItem>
                      );
                    })}
                  </List>
                </CardContent>
              </Card>
            </>
          )}
        </Container>
        {!reservation?.isPaid && (
          <Paper className={classes.paperNoRound}>
            <Box className={classes.paymentNotCompleted}>
              <Typography variant="h5" align="center">
                Payment not Completed
              </Typography>
            </Box>
            <Box padding={2}>
              <Typography variant="h4" align="center" gutterBottom>
                Total :{' '}
                {reservation?.rooms.reduce((p, c) => p + c.price * c.beds, 0)}{' '}
                THB (tax included)
              </Typography>
              <CustomLink to={'/payment/' + reservation?.id}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Go to Payment
                </Button>
              </CustomLink>
            </Box>
          </Paper>
        )}
      </Box>
    </>
  );
});
