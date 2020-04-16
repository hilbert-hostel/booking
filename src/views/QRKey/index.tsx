import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import qr from '../../assets/qr.png';
import { BackendAPI } from '../../core/repository/api/backend';

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
      marginBottom: theme.spacing(6),
      textAlign: 'center',
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
  const history = useHistory();

  throw new Error('Bye2');

  useEffect(() => {
    BackendAPI.rooms().then(console.log);
  }, []);
  const door = async (isLocked: boolean) => {
    if (isLocked) {
      await BackendAPI.openDoor();
    } else {
      await BackendAPI.closeDoor();
    }
  };
  const makeSound = async () => {
    await BackendAPI.sound();
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
        <Box flexDirection="column" justifyContent="center" display="flex">
          <Typography variant="h4" gutterBottom className={classes.title}>
            Your QR Code Key
          </Typography>
          <div>
            <img src={qr} className={classes.image} alt="qrcode" />
          </div>
          <Button
            color="primary"
            variant="contained"
            disabled
            onClick={() => history.push('/search')}
            className={classes.button}
          >
            Generate Again
          </Button>
          <Box
            flexDirection="row"
            justifyContent="space-between"
            display="flex"
          >
            <Button
              color="primary"
              variant="contained"
              onClick={() => door(true)}
            >
              Lock
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                door(false);
                throw new Error('Bye');
              }}
            >
              Unlock
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => makeSound()}
            >
              Make Sound
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
});
