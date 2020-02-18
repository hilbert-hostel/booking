import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../core/hooks/use-stores';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Paper,
  Typography,
  TextField,
  FormControl,
  Button,
} from '@material-ui/core';
import { BackendAPI } from '../../core/repository/api/backend';

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
    title: {
      flexGrow: 1,
    },
  })
);

export const Login: React.FC = observer(() => {
  const classes = useStyles();
  const { testStore, authStore } = useStores();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const addMessage = (username: string, message: string = 'hi') => {
    testStore.addMessage({ message, sender: username });
  };

  const login = async (username: string, password: string) => {
    try {
      const { data } = await BackendAPI.login({ username, password });
      const { token } = data;
      authStore.setToken(token);
      addMessage(username, token);
    } catch (error) {
      addMessage(username, 'login failed');
    }
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h3" gutterBottom>
          Login
        </Typography>
        <FormControl className={classes.inputField} fullWidth>
          <TextField
            label="Email"
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
        <Button
          variant="contained"
          onClick={() => login(username, password)}
          color="primary"
        >
          Login
        </Button>
        <ul>
          {testStore.uppercased.map(e => (
            <li>{e.sender + ' : ' + e.message}</li>
          ))}
        </ul>
      </Paper>
    </Container>
  );
});
