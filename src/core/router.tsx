import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from '../views/Home';
import { Login } from '../views/Login';
import { Navigation } from './components/Navigation';

export const AppRouter: React.FC = () => {
  return (
    <>
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
    </>
  );
};
