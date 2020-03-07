import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Box,
  Button,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { Hero } from './components/Hero';
import { RegistrationModel } from '../../core/models/registration';
import { registrationSchema } from './schema';
import { FormText } from '../../core/components/Forms/FormText';
import { BackendAPI } from '../../core/repository/api/backend';
import { useStores } from '../../core/hooks/use-stores';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(3),
      color: theme.palette.text.primary,
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
  })
);

export const Register: React.FC = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const { authStore } = useStores();
  const form = useFormik<RegistrationModel>({
    validationSchema: registrationSchema,
    initialValues: {
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      address: '',
      nationalID: '',
      phone: '',
    },
    onSubmit: async values => {
      try {
        const res = await BackendAPI.register(values);
        authStore.setToken(res.data.token);
        history.push('/');
      } catch (error) {}
    },
  });

  return (
    <>
      <Hero />
      <Container maxWidth="md" className={classes.root}>
        <Typography
          variant="h4"
          align="left"
          className={classes.text}
          gutterBottom
        >
          Register
        </Typography>
        <form onSubmit={form.handleSubmit}>
          <Box display="flex" alignItems="center" flexDirection="column">
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
              autoComplete="new-password"
              errorText={form.touched && form.errors['password']}
              onChange={form.handleChange}
              value={form.values.password}
            />
            <Box
              display="flex"
              alignItems="center"
              flexDirection="row"
              width="100%"
            >
              <FormText
                id="firstname"
                label="First name"
                name="firstname"
                autoComplete="fname"
                errorText={form.touched && form.errors['firstname']}
                onChange={form.handleChange}
                value={form.values.firstname}
              />
              <FormText
                id="lastname"
                label="Last name"
                name="lastname"
                autoComplete="lname"
                errorText={form.touched && form.errors['lastname']}
                onChange={form.handleChange}
                value={form.values.lastname}
              />
            </Box>

            <FormText
              id="nationalID"
              label="National ID"
              name="nationalID"
              autoComplete="nationalID"
              errorText={form.touched && form.errors['nationalID']}
              onChange={form.handleChange}
              value={form.values.nationalID}
            />
            <FormText
              id="address"
              label="Address"
              name="address"
              autoComplete="address"
              errorText={form.touched && form.errors['address']}
              onChange={form.handleChange}
              value={form.values.address}
            />
            <FormText
              id="phone"
              label="Phone"
              name="phone"
              autoComplete="phone"
              errorText={form.touched && form.errors['phone']}
              onChange={form.handleChange}
              value={form.values.phone}
            />
            <Button
              variant="contained"
              onClick={() => form.handleSubmit()}
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
