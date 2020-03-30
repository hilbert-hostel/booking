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
import { BackendAPI } from '../../core/repository/api/backend';

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
    },
  })
);

export const Profile: React.FC = observer(() => {
  const classes = useStyles();
  const { authStore, themeStore } = useStores();
  const history = useHistory();
  const user = authStore.user;

  useEffect(() => {
    authStore.fetchUserData();
    BackendAPI.reservations().then(console.log);
  }, [authStore]);

  const logout = () => {
    authStore.logout();
    history.push('/');
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
          <Box
            width="100%"
            minHeight="100%"
            display="flex"
            flexDirection="column"
          >
            <Box width="100%" flexGrow="1" height="100%">
              <List className={classes.listItem}>
                <ListItem disabled onClick={() => history.push('/profile')}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText id="view-reservations" primary="Profile" />
                </ListItem>
                <ListItem button onClick={() => history.push('/reservation')}>
                  <ListItemIcon>
                    <Badge badgeContent={1} color="error">
                      <ReservationIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText
                    id="view-reservations"
                    primary="View Reservations"
                  />
                </ListItem>
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
