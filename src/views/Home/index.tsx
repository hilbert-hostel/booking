import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../core/hooks/use-stores';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core';
import classes from '*.module.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(3),
    },
  })
);

export const Home: React.FC = observer(() => {
  const { testStore } = useStores();
  const classes = useStyles();
  const addMessage = () => {
    testStore.addMessage({ message: 'hello n.', sender: 'jay' });
  };

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h3" gutterBottom>
          This is home
        </Typography>
        <p>
          {testStore.uppercased
            .map(e => e.sender + ' : ' + e.message)
            .join('\n')}
        </p>
        <button onClick={() => addMessage()}>Add Message</button>
        <Link to="/login">Go to login</Link>
      </Paper>
    </Container>
  );
});
