import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../core/hooks/use-stores';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Paper,
  Typography,
  Button,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Badge,
} from '@material-ui/core';
import DarkModeIcon from '@material-ui/icons/SettingsBrightness';
import ReservationIcon from '@material-ui/icons/CardTravel';
import PeopleIcon from '@material-ui/icons/People';
import { useHistory } from 'react-router-dom';
import { orange } from '@material-ui/core/colors';
import Alert from '@material-ui/lab/Alert';
import { CustomLink } from '../../core/components/CustomLink';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(1),
      minHeight: '100%',
    },
    paper: {
      padding: theme.spacing(2),
      borderRadius: '0',
    },
    yellow: {
      color: theme.palette.getContrastText(orange[500]),
      backgroundColor: orange[500],
      height: '60px',
      width: '60px',
      marginRight: theme.spacing(2),
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    button: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
    listItem: {
      color: theme.palette.text.primary,
    },
    container: {
      height: '100%',
      flexGrow: 1,
      paddingTop: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
    },
  })
);

export const Dashboard: React.FC = observer(() => {
  const classes = useStyles();
  const {
    authStore,
    themeStore,
    reservationStore,
    bookingStore,
    snackbarStore,
  } = useStores();
  const history = useHistory();
  const user = authStore.user;

  useEffect(() => {
    authStore.fetchUserData();
    reservationStore.fetchReservations();
  }, [authStore, reservationStore]);

  const logout = () => {
    authStore.logout();
    bookingStore.clear();
    reservationStore.clear();
    history.push('/');
    snackbarStore.sendMessage({ message: 'Logged out', type: 'info' });
  };
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100%">
        <Paper elevation={3} className={classes.paper}>
          <Box display="flex" alignItems="center">
            <Avatar className={classes.yellow}>
              {user?.firstname && user?.firstname[0]}
              {user?.lastname && user?.lastname[0]}
            </Avatar>
            <Typography variant="h4">
              {user && `Hi, ${user?.firstname} ${user?.lastname}`}
            </Typography>
          </Box>
        </Paper>
        <Container maxWidth="md" className={classes.container}>
          {reservationStore.unPaid.length > 0 && (
            <Alert variant="filled" severity="warning">
              You have unpaid reservations
            </Alert>
          )}
          <Box
            width="100%"
            minHeight="100%"
            display="flex"
            flexDirection="column"
            justifyContent="stretch"
          >
            <Box width="100%" flexGrow="1" height="100%">
              <List className={classes.listItem}>
                <CustomLink to="/profile">
                  <ListItem button>
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText id="view-reservations" primary="Profile" />
                  </ListItem>
                </CustomLink>
                <CustomLink to="/reservation">
                  <ListItem button>
                    <ListItemIcon>
                      <Badge
                        badgeContent={reservationStore.unPaid.length}
                        color="error"
                      >
                        <ReservationIcon />
                      </Badge>
                    </ListItemIcon>
                    <ListItemText
                      id="view-reservations"
                      primary="View Reservations"
                    />
                  </ListItem>
                </CustomLink>
                <ListItem>
                  <ListItemIcon>
                    <DarkModeIcon />
                  </ListItemIcon>
                  <ListItemText id="dark-theme-switch" primary="Dark Theme" />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      color="primary"
                      onChange={() => themeStore.setDarkMode(!themeStore.dark)}
                      checked={themeStore.dark}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Box>
            <Box width="100%">
              <Button
                color="primary"
                fullWidth
                variant="contained"
                className={classes.button}
                onClick={() => logout()}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
});
