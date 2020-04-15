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
  CardMedia,
  Divider,
  Button,
  List,
  ListItem,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { TitleBar } from '../../core/components/TitleBar';
import { BackendAPI } from '../../core/repository/api/backend';
import { Reservation } from '../../core/models/reservation';
import moment from 'moment';
import { pluralize } from '../../core/utils/text-formatting';
import { CustomLink } from '../../core/components/CustomLink';
import { useStores } from '../../core/hooks/use-stores';
import { handleServerError } from '../../core/utils/handleServerError';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
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
    noPadding: {
      padding: 0,
    },
  })
);

export const BookingComplete: React.FC = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { snackbarStore } = useStores();
  const [reservationInfo, setReservationInfo] = useState<Reservation>();

  useEffect(() => {
    if (id) {
      try {
        BackendAPI.reservationStatus(id).then(async res => {
          setReservationInfo({
            ...res.data,
            checkIn: new Date(res.data.checkIn),
            checkOut: new Date(res.data.checkOut),
          });
        });
      } catch (error) {
        handleServerError(error, snackbarStore);
      }
    }
  }, [id, snackbarStore]);
  useEffect(() => {
    if (reservationInfo) {
      BackendAPI.paymentStatus(reservationInfo.id).then(res => {
        const data = res.data;
        if (!data.isPaid) {
          history.push('/payment/' + reservationInfo.id);
        }
      });
    }
  }, [reservationInfo, history]);

  return (
    <>
      <TitleBar title="Booking Complete" backButton={false} />
      <Container maxWidth="md" className={classes.root}>
        <Box width="100%">
          {reservationInfo && (
            <>
              <Card className={classes.card}>
                {reservationInfo.rooms[0].photos[0] && (
                  <CardMedia
                    component="img"
                    alt={
                      reservationInfo.rooms[0].photos[0].photo_description ||
                      reservationInfo.rooms[0].type
                    }
                    height="140"
                    image={reservationInfo.rooms[0].photos[0].photo_url}
                    title={reservationInfo.rooms[0].type}
                  />
                )}
                <CardContent>
                  <Typography variant="h5">
                    {moment(reservationInfo.checkIn).format('DD MMMM YYYY')} -{' '}
                    {moment(reservationInfo.checkOut).format('DD MMMM YYYY')}
                  </Typography>
                  <Divider className={classes.divider} />
                  <Typography variant="h6">
                    Booking ID : {reservationInfo.id}
                  </Typography>
                  {/* <Typography variant="h6">Transaction ID : asdf</Typograsphy> */}
                  <Typography variant="h6">
                    {moment(reservationInfo.checkOut).diff(
                      moment(reservationInfo.checkIn),
                      'd'
                    )}{' '}
                    {pluralize(
                      'Day',
                      moment(reservationInfo.checkOut).diff(
                        moment(reservationInfo.checkIn),
                        'd'
                      )
                    )}
                    , {reservationInfo.rooms.reduce((p, c) => p + c.beds, 0)}{' '}
                    {pluralize(
                      'Bed',
                      reservationInfo.rooms.reduce((p, c) => p + c.beds, 0)
                    )}
                  </Typography>
                  <Typography variant="h6">
                    Special Request : {reservationInfo.specialRequests || '-'}
                  </Typography>
                  <Typography variant="h6">Rooms :</Typography>
                  <List className={classes.noPadding}>
                    {reservationInfo.rooms.map(c => {
                      return (
                        <ListItem
                          key={'room-' + c.id}
                          className={classes.noPadding}
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
              <CustomLink to="/">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Home
                </Button>
              </CustomLink>
            </>
          )}
        </Box>
      </Container>
    </>
  );
});
