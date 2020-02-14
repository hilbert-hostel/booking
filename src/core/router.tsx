import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from '../views/Home';
import { Navigation } from './components/Navigation';
import { Login } from '../views/Login';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Footer } from './components/Footer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flexGrow: 1,
      height: '100%',
    },
  })
);

export const AppRouter: React.FC = () => {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        <Navigation />
        <div className={classes.content}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route>
              <Home />
            </Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};
