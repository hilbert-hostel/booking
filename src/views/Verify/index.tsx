import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Button,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { CustomLink } from '../../core/components/CustomLink';
import { BackendAPI } from '../../core/repository/api/backend';
import { useStores } from '../../core/hooks/use-stores';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3),
      color: theme.palette.text.primary,
      height: '100%',
    },
    text: {
      marginBottom: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(1),
    },
    button: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      width: '100%',
    },
    form: {
      height: '100%',
    },
  })
);

export const Verify: React.FC = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const { snackbarStore } = useStores();
  const [verifying] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const userID = query.get('userID');
    const token = query.get('token');
    if (userID && token) {
      BackendAPI.verifyUser({ userID, token })
        .then(e => {
          snackbarStore.sendMessage({
            message: 'Account verified, please login',
            type: 'success',
          });
          history.push('/login');
        })
        .catch(error => {
          snackbarStore.sendMessage({
            message: 'Something went wrong or account already verified',
            type: 'error',
          });
          history.push('/login');
        });
      location.search = '';
    } else {
      snackbarStore.sendMessage({
        message: 'Invalid verification link',
        type: 'error',
      });
      history.push('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth="md" className={classes.root}>
        <Typography variant="h4" className={classes.text}>
          {verifying ? 'Verifying...' : 'Invalid Verification Link'}
        </Typography>

        {!verifying && (
          <CustomLink to="/login">
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Login
            </Button>
          </CustomLink>
        )}
      </Container>
    </>
  );
});
