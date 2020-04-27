import React, { useEffect, useState } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { useStores } from '../../core/hooks/use-stores';
import { observer } from 'mobx-react-lite';
import { TitleBar } from '../../core/components/TitleBar';
import { BackendAPI } from '../../core/repository/api/backend';
import qrcode from 'qrcode';
import { ReservationStatusResponse } from '../../core/models/reservation';
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
    noLineHeight: {
      verticalAlign: 'middle',
    },
    qrImage: {
      marginTop: theme.spacing(2),
      width: 'min( 80%, 500px)',
      height: 'auto',
    },
    bold: {
      fontWeight: 'bold',
    },
    text: {
      color: theme.palette.text.primary,
    },
    buttonLink: {
      textDecoration: 'none',
    },
    button: {
      padding: theme.spacing(2),
    },
    priceText: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
      color: theme.palette.text.primary,
    },
  })
);

export const Payment: React.FC = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();
  const { themeStore, snackbarStore } = useStores();
  const [reservationInfo, setReservationInfo] = useState<
    ReservationStatusResponse
  >();
  const [qr, setQR] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [url, setUrl] = useState<string>();

  useEffect(() => {
    if (id) {
      try {
        BackendAPI.reservationStatus(id).then(async res => {
          setReservationInfo(res.data);
        });
        BackendAPI.paymentInfo(id).then(async ({ data }) => {
          const { url, amount } = data;
          setAmount(amount);
          setUrl(url + '?callback_url=' + window.location.href);
          if (url) {
            setQR(
              await qrcode.toDataURL(url, {
                errorCorrectionLevel: 'H',
                color: {
                  dark: '#000', // Blue dots
                  light: '#FFF', // Transparent background
                },
              })
            );
          }
        });
      } catch (error) {
        handleServerError(error, snackbarStore);
      }
    }
  }, [id, themeStore.dark, snackbarStore]);

  useEffect(() => {
    if (reservationInfo) {
      let timer: any;
      console.log('hi');
      const newTimer = () => {
        console.log('time is ticking');
        return setTimeout(async () => {
          const { data } = await BackendAPI.paymentStatus(reservationInfo.id);
          if (data.isPaid) {
            history.push('/complete/' + reservationInfo.id);
            snackbarStore.sendMessage({
              message: 'Booking Successful',
              type: 'success',
            });
            clearTimeout(timer as any);
          } else {
            timer = newTimer();
          }
        }, 1000);
      };
      timer = newTimer();
      return () => {
        console.log('time stop la');
        clearTimeout(timer as any);
      };
    }
  }, [reservationInfo, history, snackbarStore]);

  return (
    <>
      <TitleBar title="Payment" backTo="/search/result" />
      <Container maxWidth="md" className={classes.root}>
        {qr ? (
          <>
            <Box
              width="100%"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <img
                src={qr}
                className={classes.qrImage}
                alt={'qr for' + reservationInfo?.id}
              />
            </Box>
            <Typography variant="body1" gutterBottom className={classes.text}>
              Scan QR code to pay
            </Typography>
            <Typography variant="h4" className={classes.priceText}>
              {amount} <small>THB (tax included)</small>
            </Typography>
            <Typography variant="body1" gutterBottom className={classes.text}>
              or
            </Typography>
            <a href={url} className={classes.buttonLink}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Pay with SCB App
              </Button>
            </a>
          </>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
});
