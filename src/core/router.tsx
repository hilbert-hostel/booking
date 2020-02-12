import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "../views/Home";
import { Login } from "../views/Login";
export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};
