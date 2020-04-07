import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useHistory,
  RouteProps,
} from 'react-router-dom';
import { Search } from '../views/Search';
import { Login } from '../views/Login';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { BottomNav } from './components/BottomNavigation';
import { SearchResult } from '../views/SearchResult';
import { Profile } from '../views/Profile';
import { Register } from '../views/Register';
import { Home } from '../views/Home';
import { QRKey } from '../views/QRKey';
import { AnimatedSwitch, spring } from 'react-router-transition';
import { RoomDetails } from '../views/RoomDetails';
import { ConfirmBooking } from '../views/ConfirmBooking';
import { PopupSnackbar } from './components/PopupSnackbar';
import { Payment } from '../views/Payment';
import { BookingComplete } from '../views/BookingComplete';
import { Reservations } from '../views/Reservations';
import { ReservationDetails } from '../views/ReservationDetails';
import { useStores } from './hooks/use-stores';
import { observer } from 'mobx-react-lite';

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
          paddingBottom: '0',
        },
      },
    },
  })
);

// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles: any) {
  return {
    opacity: styles.opacity,
    // transform: `translate(${styles.translateX}%, 0)`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val: any) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

const transition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    // scale: 1.2,
    translateX: -100,
    // translate: `translateX()`'-100%',
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: bounce(0),
    // scale: bounce(0.8),
    translateX: 100,
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: bounce(1),
    // scale: bounce(1),
    translateX: 0,
  },
};
export const AppRouter: React.FC = () => {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        {/* <Navigation /> */}
        <AnimatedSwitch
          atEnter={transition.atEnter}
          atLeave={transition.atLeave}
          atActive={transition.atActive}
          mapStyles={mapStyles}
          className={classes.content}
        >
          {/* <Switch> */}
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
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
          {/* </Switch> */}
        </AnimatedSwitch>
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
          if (error.response) {
            switch (error.response.status) {
              case 401:
                snackbarStore.sendMessage({
                  message: 'You are not logged In',
                  type: 'error',
                });
                history.push('/login');
                break;
            }
          }
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
