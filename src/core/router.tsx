import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from '../views/Home';
import { Navigation } from './components/Navigation';
import { Login } from '../views/Login';
import { makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
    },
  })
);

export const AppRouter: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
