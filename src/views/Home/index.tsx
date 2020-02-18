import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../core/hooks/use-stores';
import { useHistory } from 'react-router-dom';
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
import { User } from '../../core/models/user';

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

export const Home: React.FC = observer(() => {
  const { testStore, themeStore, authStore } = useStores();
  const classes = useStyles();
  const history = useHistory();
  const [message, setMessage] = useState();
  const [user, setUser] = useState<User>();

  useEffect(() => {
    BackendAPI.ping().then(({ data }) => {
      setMessage(data.message);
    });

    authStore.fetchUserData().then(() => {
      const { user } = authStore;
      setUser(user);
    });
  }, [authStore]);

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
            {user && ` ${user.firstname}`}
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
            onClick={() => history.push('/login')}
            color="default"
          >
            Go to Login
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
