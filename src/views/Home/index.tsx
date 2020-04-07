import React from 'react';
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
import { useStores } from '../../core/hooks/use-stores';
import { CustomLink } from '../../core/components/CustomLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100%',
      flexGrow: 1,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    },

    filter: {
      backdropFilter: 'blur(2px) brightness(0.7)',
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: ' rgba(255,255,255,0.4)',
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
    },
    button: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
      zIndex: 5,
    },
  })
);

export const Home: React.FC = observer(() => {
  const classes = useStyles();
  const { authStore, reservationStore } = useStores();
  return (
    <Box
      style={{
        backgroundImage: `url(${'https://pix10.agoda.net/hotelImages/1165482/-1/781e60570bbaa427b4afa9d66b7d500d.jpg?s=1024x768'})`,
      }}
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
            Welcome to Hilbert Hostel
          </Typography>
          <CustomLink to="/search">
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
            >
              Booking
            </Button>
          </CustomLink>
          <CustomLink to="/qrkey">
            <Button
              color="primary"
              variant="contained"
              disabled={
                !authStore.isAuthenticated &&
                reservationStore.reservations &&
                !(reservationStore.reservations?.length > 1)
              }
              className={classes.button}
            >
              Get QR Code key
            </Button>
          </CustomLink>
        </Box>
      </Container>
    </Box>
  );
});
