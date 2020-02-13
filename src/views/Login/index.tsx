import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../core/hooks/use-stores';
import { Link } from 'react-router-dom';
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
  const { testStore } = useStores();
  const [username, setUsername] = useState('');

  const addMessage = (username: string) => {
    testStore.addMessage({ message: 'hello n.', sender: username });
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h3" gutterBottom>
          Login
        </Typography>
        <FormControl className={classes.inputField} fullWidth>
          <TextField
            id="standard-basic"
            label="Email"
            placeholder="john@doe.com"
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
        </FormControl>
        <FormControl className={classes.inputField} fullWidth>
          <TextField id="standard-basic" label="Password" type="password" />
        </FormControl>
        <Button
          variant="contained"
          onClick={() => addMessage(username)}
          color="primary"
        >
          Login
        </Button>
        <p>
          {testStore.uppercased
            .map(e => e.sender + ' : ' + e.message)
            .join('\n')}
        </p>
        <Link to="/login">Go to login</Link>
      </Paper>
    </Container>
  );
});
