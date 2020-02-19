import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../core/hooks/use-stores';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  TextField,
  FormControl,
  Button,
  Divider,
  Box,
} from '@material-ui/core';
import { BackendAPI } from '../../core/repository/api/backend';
import { useHistory } from 'react-router-dom';
import { Hero } from './components/Hero';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(3),
    },
    inputField: {
      marginBottom: theme.spacing(2),
    },
    text: {
      color: theme.palette.text.primary,
    },
    title: {
      flexGrow: 1,
    },
    divider: {
      marginBottom: theme.spacing(2),
    },
    button: {
      padding: theme.spacing(2),
    },
  })
);

export const Login: React.FC = observer(() => {
  const classes = useStyles();
  const { testStore, authStore } = useStores();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const addMessage = (username: string, message: string = 'hi') => {
    testStore.addMessage({ message, sender: username });
  };

  const login = async (username: string, password: string) => {
    try {
      const { data } = await BackendAPI.login({ username, password });
      const { token } = data;
      authStore.setToken(token);
      history.push('/');
    } catch (error) {
      addMessage(username, 'login failed');
    }
  };

  return (
    <>
      <Hero />
      <Container maxWidth="md" className={classes.root}>
        <Typography
          variant="h3"
          className={classes.text}
          align="center"
          gutterBottom
        >
          Login
        </Typography>
        <Typography
          variant="subtitle1"
          className={classes.text}
          align="center"
          gutterBottom
        >
          Please enter your Username and Password
        </Typography>
        <Box alignItems="stretch" flexDirection="column" display="flex">
          <FormControl className={classes.inputField} fullWidth>
            <TextField
              label="Username"
              placeholder="john@doe.com"
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
          </FormControl>
          <FormControl className={classes.inputField} fullWidth>
            <TextField
              label="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
          </FormControl>
          <Divider className={classes.divider} />
          <Button
            variant="contained"
            onClick={() => login(username, password)}
            color="primary"
            className={classes.button}
          >
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
});
