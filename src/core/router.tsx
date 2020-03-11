import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Search } from '../views/Search';
import { Login } from '../views/Login';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { BottomNav } from './components/BottomNavigation';
import { SearchResult } from '../views/SearchResult';
import { Profile } from '../views/Profile';
import { Register } from '../views/Register';
import { Home } from '../views/Home';
import { QRKey } from '../views/QRKey';

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
      marginBottom: '56px',
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

export const AppRouter: React.FC = () => {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.root}>
        {/* <Navigation /> */}
        <div className={classes.content}>
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/qrkey">
              <QRKey />
            </Route>
            <Route path="/notification">
              <Home />
            </Route>
            <Route path="/search/result">
              <SearchResult />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route>
              <Home />
            </Route>
          </Switch>
        </div>
        <BottomNav />
        {/* <Footer /> */}
      </div>
    </Router>
  );
};
