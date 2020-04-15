import React from 'react';
import { Snackbar, makeStyles, Theme, createStyles } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useStores } from '../../hooks/use-stores';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      bottom: '66px',
    },
  })
);

const Alert = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export const PopupSnackbar: React.FC = observer(() => {
  const { snackbarStore } = useStores();
  const alert = snackbarStore.message;
  const removeAlert = () => {
    snackbarStore.clearMessage();
  };
  const classes = useStyles();
  return (
    <Snackbar
      open={!!alert}
      className={classes.root}
      autoHideDuration={3000}
      onClose={removeAlert}
    >
      {!!alert ? (
        <Alert onClose={removeAlert} severity={alert.type}>
          {alert.message}
        </Alert>
      ) : (
        <p>nothing to show</p>
      )}
    </Snackbar>
  );
});
