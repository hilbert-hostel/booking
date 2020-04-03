import React from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Badge from '@material-ui/core/Badge';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import LoginIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useStores } from '../../hooks/use-stores';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: '0',
      width: '100vw',
    },
  })
);

export const BottomNav: React.FC<BottomNavProps> = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const { authStore, bookingStore, reservationStore } = useStores();
  return (
    <BottomNavigation
      value={history.location.pathname.split('/')[1]}
      className={classes.root}
    >
      <BottomNavigationAction
        value=""
        onClick={() => history.push('/')}
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        value="search"
        onClick={() => {
          bookingStore.selectedRooms.length > 0
            ? history.push('/search/result')
            : history.push('/search');
        }}
        icon={<SearchIcon />}
      />
      {authStore.isAuthenticated && (
        <BottomNavigationAction
          value="qrkey"
          onClick={() => history.push('/qrkey')}
          icon={<VpnKeyIcon />}
          disabled={!authStore.isAuthenticated}
        />
      )}
      {authStore.isAuthenticated ? (
        <BottomNavigationAction
          value="profile"
          onClick={() => history.push('/profile')}
          icon={
            <Badge
              badgeContent={reservationStore.unPaid ? 1 : 0}
              color="error"
              variant="dot"
            >
              <PersonIcon />
            </Badge>
          }
        />
      ) : (
        <BottomNavigationAction
          value="login"
          onClick={() => history.push('/login')}
          icon={<LoginIcon />}
        />
      )}
    </BottomNavigation>
  );
});

export interface BottomNavProps {}
