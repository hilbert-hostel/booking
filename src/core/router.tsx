import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  RouteProps,
} from 'react-router-dom';
import { Search } from '../views/Search';
import { Login } from '../views/Login';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { BottomNav } from './components/BottomNavigation';
import { SearchResult } from '../views/SearchResult';
import { Dashboard } from '../views/Dashboard';
import { Register } from '../views/Register';
import { Home } from '../views/Home';
import { QRKey } from '../views/QRKey';
import { RoomDetails } from '../views/RoomDetails';
import { ConfirmBooking } from '../views/ConfirmBooking';
import { PopupSnackbar } from './components/PopupSnackbar';
import { Payment } from '../views/Payment';
import { BookingComplete } from '../views/BookingComplete';
import { Reservations } from '../views/Reservations';
import { ReservationDetails } from '../views/ReservationDetails';
import { useStores } from './hooks/use-stores';
import { observer } from 'mobx-react-lite';
import { Verify } from '../views/Verify';
import { handleServerError } from './utils/handleServerError';
import { Profile } from '../views/Profile';
import { EditProfile } from '../views/Profile/components/EditProfile';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
      maxWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'stretch',
      overflow: 'hidden',
    },
    content: {
      height: '100%',
      width: '100%',
      marginBottom: '56px',
      // display: 'block',
      overflowX: 'hidden',
      flexGrow: 1,
      '& > div': {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        overflowX: 'hidden',
        paddingBottom: '56px',
        '@supports (-webkit-appearance:none)': {
          minHeight: 'calc(100vh - 56px);',
          paddingBottom: '56px',
        },
      },
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
          <div>
            <Switch>
              <Route path="/register">
                <Register />
              </Route>
              <MainRoute path="/dashboard">
                <Dashboard />
              </MainRoute>
              <MainRoute path="/profile/edit">
                <EditProfile />
              </MainRoute>
              <MainRoute path="/profile">
                <Profile />
              </MainRoute>
              <MainRoute path="/qrkey">
                <QRKey />
              </MainRoute>
              <MainRoute path="/payment/:id">
                <Payment />
              </MainRoute>
              <MainRoute path="/reservation/:id">
                <ReservationDetails />
              </MainRoute>
              <MainRoute path="/reservation">
                <Reservations />
              </MainRoute>
              <MainRoute path="/complete/:id">
                <BookingComplete />
              </MainRoute>
              <Route path="/confirm">
                <ConfirmBooking />
              </Route>
              <Route path="/search/rooms/:type">
                <RoomDetails />
              </Route>
              <Route path="/verify">
                <Verify />
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
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </div>
        </div>
        <BottomNav />
        <PopupSnackbar />
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export const MainRoute = observer<MainRouteProps>(
  ({ path, children, ...rest }) => {
    const { authStore, snackbarStore } = useStores();
    const history = useHistory();

    useEffect(() => {
      const initStores = async () => {
        try {
          if (authStore.isAuthenticated && !authStore.user) {
            await authStore.init();
          }
        } catch (error) {
          handleServerError(error, snackbarStore, {
            401: {
              message: {
                message: 'You are not logged In',
                type: 'error',
              },
              callback: () => {
                authStore.logout();
                history.push('/login');
              },
            },
          });
        }
      };
      initStores();
    }, [authStore, snackbarStore, history]);

    return (
      <Route path={path} {...rest}>
        {!authStore.isAuthenticated ? <Redirect to="/login" /> : children}
      </Route>
    );
  }
);

export type MainRouteProps = RouteProps;
