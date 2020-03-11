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
import { useHistory } from 'react-router-dom';
import { useStores } from '../../core/hooks/use-stores';

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
  const history = useHistory();
  const { authStore } = useStores();
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
            Welcome to Hilbert Hostel Management System
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push('/search')}
            className={classes.button}
          >
            Booking
          </Button>
          <Button
            color="primary"
            variant="contained"
            disabled={!authStore.isAuthenticated}
            onClick={() => history.push('/qrkey')}
            className={classes.button}
          >
            Get QR Code key
          </Button>
        </Box>
      </Container>
    </Box>
  );
});
