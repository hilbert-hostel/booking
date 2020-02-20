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
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { orange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
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
  })
);

export const Profile: React.FC = observer(() => {
  const classes = useStyles();
  const { authStore } = useStores();
  const history = useHistory();
  const user = authStore.user;

  useEffect(() => {
    authStore.fetchUserData();
  }, [authStore]);

  const logout = () => {
    authStore.logout();
    history.push('/');
  };

  return (
    <>
      <Paper elevation={3} className={classes.paper}>
        <Box display="flex" alignItems="center">
          <Avatar className={classes.yellow}>
            {user?.firstname[0]}
            {user?.lastname[0]}
          </Avatar>
          <Typography variant="h4">
            {user && `Hi, ${user?.firstname} ${user?.lastname}`}
          </Typography>
        </Box>
      </Paper>
      <Container maxWidth="md" className={classes.root}>
        <Typography variant="h3" gutterBottom>
          Profile
        </Typography>
        <Button color="primary" variant="contained" onClick={() => logout()}>
          Logout
        </Button>
      </Container>
    </>
  );
});
