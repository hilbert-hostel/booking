import React, { useEffect, useState } from 'react';
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
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useStores } from '../../core/hooks/use-stores';
import { observer } from 'mobx-react-lite';
import { TitleBar } from '../../core/components/TitleBar';
import { BackendAPI } from '../../core/repository/api/backend';
import { Reservation } from '../../core/models/reservation';
import moment from 'moment';
import { pluralize } from '../../core/utils/text-formatting';
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
  })
);

export const ReservationDetails: React.FC = observer(() => {
  const classes = useStyles();
  const history = useHistory();
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
  }, [id]);

  const getByType = () => {
    const fromType = reservation?.rooms.reduce((p, c) => {
      if (c.type in p) {
        return { ...p, [c.type]: [...p[c.type], c] };
      } else {
        return { ...p, [c.type]: [c] };
      }
    }, {} as { [key: string]: any[] });
    return fromType;
  };

  return (
    <>
      <Box
        alignItems="stretch"
        justifyContent="center"
        display="flex"
        minHeight="100%"
        flexDirection="column"
      >
        <TitleBar
          title="Reservation Details"
          onBack={() => history.push('/reservation/')}
        />
        <Container maxWidth="md" className={classes.container}>
          {reservation && (
            <>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="h5">
                    {moment(reservation.checkIn).format('DD MMMM YYYY')} -{' '}
                    {moment(reservation.checkIn).format('DD MMMM YYYY')}
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
                  <List>
                    {reservation.rooms.map(c => {
                      return (
                        <ListItem key={'room-' + c.id}>
                          <Typography variant="h6">
                            {c.type} {c.id} : {c.beds}{' '}
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
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => history.push('/payment/' + reservation?.id)}
              >
                Go to Payment
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </>
  );
});
