import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { BackendAPI } from '../../core/repository/api/backend';
import qrcode from 'qrcode';
import { useStores } from '../../core/hooks/use-stores';
import { handleServerError } from '../../core/utils/handleServerError';
import { CustomLink } from '../../core/components/CustomLink';
import { Room } from '../../core/models/room';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      flexGrow: 1,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    },
    filter: {
      // backdropFilter: 'blur(2px) brightness(0.7)',
      // position: 'absolute',
      // height: '100%',
      // width: '100%',
      // backgroundColor: ' rgba(255,255,255,0.4)',
    },
    box: {
      height: '100%',
    },
    content: {
      position: 'relative',
      zIndex: 4,
    },
    title: {
      marginBottom: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.primary,
    },
    text: {
      color: theme.palette.text.primary,
    },
    button: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
      zIndex: 5,
    },
    image: {
      height: 'auto',
      margin: '0 auto',
      display: 'block',
      marginBottom: theme.spacing(3),
    },
  })
);

export const QRKey: React.FC = observer(() => {
  const classes = useStyles();
  const { themeStore, snackbarStore } = useStores();
  const [room, setRoom] = useState<Room>();
  const [rooms, setRooms] = useState<Room[]>();
  const [error, setError] = useState<string>();
  const [qr, setQR] = useState<string>();

  useEffect(() => {
    BackendAPI.rooms()
      .then(({ data }) => {
        setRooms(data.rooms);
      })
      .catch(error => {
        handleServerError(error, snackbarStore, {
          400: {
            callback: () =>
              setError(
                "You haven't checked in yet, please check in at the kiosk at the hostel"
              ),
          },
        });
      });
  }, [snackbarStore]);

  useEffect(() => {
    if (room) {
      BackendAPI.generateQR(room.id).then(async res => {
        setQR(
          await qrcode.toDataURL(res.data.code, {
            errorCorrectionLevel: 'M',
            color: themeStore.dark
              ? {
                  dark: '#FFF',
                  light: '#0000',
                }
              : {
                  dark: '#000',
                  light: '#0000',
                },
          })
        );
      });
    }
  }, [room, themeStore]);

  const getQRCode = () => {
    if (room) {
      BackendAPI.generateQR(room.id).then(async res => {
        setQR(
          await qrcode.toDataURL(res.data.code, {
            errorCorrectionLevel: 'M',
            color: themeStore.dark
              ? {
                  dark: '#FFF',
                  light: '#0000',
                }
              : {
                  dark: '#000',
                  light: '#0000',
                },
          })
        );
      });
    }
  };

  return (
    <Box
      className={classes.root}
      flexDirection="column"
      justifyContent="center"
      display="flex"
    >
      <Container maxWidth="xl" className={classes.filter}>
        <></>
      </Container>
      <Container maxWidth="xs" className={classes.content}>
        {room ? (
          <Box flexDirection="column" justifyContent="center" display="flex">
            <Typography
              variant="h4"
              gutterBottom
              align="center"
              className={classes.text}
            >
              Your QR code key
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              className={classes.text}
            >
              Room {room.id}
            </Typography>
            <div>
              {qr ? (
                <img src={qr} className={classes.image} alt="qrcode" />
              ) : (
                <CircularProgress className={classes.image} />
              )}
            </div>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                setQR(undefined);
                getQRCode();
              }}
              className={classes.button}
            >
              Generate Again
            </Button>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              alignItems="flex-end"
              display="flex"
            >
              <Button
                color="primary"
                variant="contained"
                onClick={() => {
                  setRoom(undefined);
                  setQR(undefined);
                }}
              >
                Back
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            flexDirection="column"
            justifyContent="center"
            display="flex"
            alignItems="stretch"
          >
            {error ? (
              <>
                <Typography
                  variant="h4"
                  gutterBottom
                  align="center"
                  className={classes.title}
                >
                  {error}
                </Typography>
                <CustomLink to="/">
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.button}
                  >
                    Home
                  </Button>
                </CustomLink>
              </>
            ) : (
              <>
                <Typography
                  variant="h4"
                  gutterBottom
                  align="center"
                  className={classes.title}
                >
                  Please Select Room
                </Typography>
                {rooms ? (
                  rooms?.map(e => {
                    return (
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setRoom(e)}
                        className={classes.button}
                      >
                        Room {e.id}
                      </Button>
                    );
                  })
                ) : (
                  <Box
                    flexDirection="column"
                    justifyContent="center"
                    display="flex"
                    alignItems="center"
                  >
                    <CircularProgress />
                  </Box>
                )}
              </>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
});
