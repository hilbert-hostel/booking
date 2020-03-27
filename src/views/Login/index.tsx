import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../core/hooks/use-stores';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Button,
  Divider,
  Box,
} from '@material-ui/core';
import { BackendAPI } from '../../core/repository/api/backend';
import { useHistory } from 'react-router-dom';
import { Hero } from './components/Hero';
import { useFormik } from 'formik';
import { FormText } from '../../core/components/Forms/FormText';
import { LoginModel } from '../../core/models/auth';
import { loginSchema } from './schema';
import { useQuery } from '../../core/hooks/use-query';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(3),
    },
    inputField: {
      marginBottom: theme.spacing(2),
    },
    text: {
      color: theme.palette.text.primary,
    },
    title: {
      flexGrow: 1,
    },
    divider: {
      marginBottom: theme.spacing(2),
    },
    button: {
      padding: theme.spacing(2),
    },
  })
);

export const Login: React.FC = observer(() => {
  const classes = useStyles();
  const { authStore } = useStores();
  const history = useHistory();
  const query = useQuery();

  const form = useFormik<LoginModel>({
    validationSchema: loginSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async values => {
      try {
        const res = await BackendAPI.login(values);
        authStore.setToken(res.data.token);
        history.push(query.get('returnTo') || '/');
      } catch (error) {}
    },
  });

  return (
    <>
      <Hero />
      <Container maxWidth="md" className={classes.root}>
        <Typography
          variant="h3"
          className={classes.text}
          align="center"
          gutterBottom
        >
          Login
        </Typography>
        <Typography
          variant="subtitle1"
          className={classes.text}
          align="center"
          gutterBottom
        >
          Please enter your Username and Password
        </Typography>
        <form onSubmit={form.handleSubmit}>
          <Box alignItems="stretch" flexDirection="column" display="flex">
            <FormText
              id="email"
              label="E-mail"
              name="email"
              errorText={form.touched && form.errors['email']}
              onChange={form.handleChange}
              value={form.values.email}
            />
            <FormText
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              errorText={form.touched && form.errors['password']}
              onChange={form.handleChange}
              value={form.values.password}
            />
            <Button
              variant="contained"
              onClick={() => form.submitForm()}
              color="primary"
              className={classes.button}
            >
              Login
            </Button>
            <Divider className={classes.divider} />
            <Button
              variant="contained"
              onClick={() => history.push('/register')}
              color="primary"
              className={classes.button}
            >
              Register
            </Button>
          </Box>
        </form>
      </Container>
    </>
  );
});
