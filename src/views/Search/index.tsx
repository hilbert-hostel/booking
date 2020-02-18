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
} from '@material-ui/core';

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

export const Search: React.FC = observer(() => {
  const classes = useStyles();
  const { testStore, authStore } = useStores();

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h3" gutterBottom>
          Search
        </Typography>
      </Paper>
    </Container>
  );
});
