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
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useStores } from '../../core/hooks/use-stores';
import { observer } from 'mobx-react-lite';
import { TitleBar } from '../../core/components/TitleBar';
import { BackendAPI } from '../../core/repository/api/backend';
import { Reservation } from '../../core/models/reservation';
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
  })
);

export const BookingComplete: React.FC = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { authStore, themeStore } = useStores();
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
      } catch (error) {}
    }
  }, [id]);
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
                <CardContent>
                  <Typography className="h6">
                    Booking ID : {reservationInfo.id}
                  </Typography>
                  <Typography className="h6">Transaction ID : asdf</Typography>
                  <Typography className="h6">
                    Guests :{' '}
                    {reservationInfo.rooms.reduce((p, c) => p + c.beds, 0)}
                  </Typography>
                  <Typography className="h6">
                    Rooms : {reservationInfo.rooms.map(c => c.type).join(', ')}
                  </Typography>
                  <Divider className={classes.divider} />
                </CardContent>
              </Card>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={() => history.push('/')}
              >
                Home
              </Button>
            </>
          )}
        </Box>
      </Container>
    </>
  );
});
