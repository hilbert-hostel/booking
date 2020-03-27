import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../core/hooks/use-stores';
import {
  Container,
  Paper,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Button,
} from '@material-ui/core';
import { Hero } from './components/Hero';
import { BackendAPI } from '../../core/repository/api/backend';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(3),
    },
    button: {
      marginRight: theme.spacing(1),
    },
  })
);

export const Search: React.FC = observer(() => {
  const { testStore, themeStore, authStore, bookingStore } = useStores();
  const classes = useStyles();
  const [message] = useState();
  const history = useHistory();

  useEffect(() => {
    authStore.fetchUserData();
    if (bookingStore.selectRooms.length > 0) {
      history.push('/search/result');
    }
  }, [authStore, bookingStore, history]);

  const addMessage = () => {
    testStore.addMessage({ message: 'Hi', sender: 'jay' });
  };

  return (
    <>
      <Hero />
      <Container maxWidth="lg" className={classes.root}>
        <Paper elevation={3} className={classes.paper}>
          <Typography variant="h3" gutterBottom>
            This is home
          </Typography>
          <Typography variant="h6" gutterBottom>
            pong? : {message || 'Waiting...'}
            {authStore.user && ` ${authStore.user.firstname}`}
          </Typography>
          <ul>
            {testStore.uppercased.map(e => (
              <li>{e.sender + ' : ' + e.message}</li>
            ))}
          </ul>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => addMessage()}
            color="primary"
          >
            Add Message
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={() => themeStore.setDarkMode(!themeStore.dark)}
            color="default"
          >
            Toggle dark mode
          </Button>
        </Paper>
      </Container>
    </>
  );
});
