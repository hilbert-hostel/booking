import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Button,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
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

export const Register: React.FC = observer(() => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Container maxWidth="md" className={classes.root}>
        <Typography variant="h4" className={classes.text}>
          Please Check Verification Email
        </Typography>

        <Button
          variant="contained"
          onClick={() => history.push('/login')}
          color="primary"
          className={classes.button}
        >
          Login
        </Button>
      </Container>
    </>
  );
});
