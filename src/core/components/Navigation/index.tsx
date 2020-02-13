import React, { useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { SwipeableTemporaryDrawer } from '../Drawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export const Navigation: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const ref = useRef<any>();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => ref.current?.toggleDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            onClick={() => {
              history.push('/');
            }}
            variant="h6"
            className={classes.title}
          >
            Hilbert
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <SwipeableTemporaryDrawer ref={ref} />
    </>
  );
};
