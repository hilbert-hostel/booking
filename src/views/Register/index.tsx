import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Box,
  Button,
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import { RegistrationModel } from '../../core/models/registration';
import { registrationSchema } from './schema';
import { FormText } from '../../core/components/Forms/FormText';
import { TitleBar } from '../../core/components/TitleBar';
import { BackendAPI } from '../../core/repository/api/backend';
import { useStores } from '../../core/hooks/use-stores';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(3),
      color: theme.palette.text.primary,
      minHeight: '100%',
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
      padding: '',
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
      <TitleBar title="Register" />
      <Container maxWidth="md" className={classes.root}>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="stretch"
          flexDirection="column"
          height="100%"
        >
          <Box flexGrow={1} height="100%" paddingBottom={1}>
            <form onSubmit={form.handleSubmit} className={classes.form}>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                height="100%"
              >
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  width="100%"
                  height="100%"
                  flexGrow={1}
                >
                  <FormText
                    id="firstname"
                    label="First name"
                    name="firstname"
                    autoComplete="fname"
                    errorText={
                      form.submitCount > 0 && form.touched
                        ? form.errors['firstname']
                        : undefined
                    }
                    onChange={form.handleChange}
                    value={form.values.firstname}
                  />
                  <FormText
                    id="lastname"
                    label="Last name"
                    name="lastname"
                    autoComplete="lname"
                    errorText={
                      form.submitCount > 0 && form.touched
                        ? form.errors['lastname']
                        : undefined
                    }
                    onChange={form.handleChange}
                    value={form.values.lastname}
                  />
                  <FormText
                    id="email"
                    label="E-mail"
                    name="email"
                    errorText={
                      form.submitCount > 0 && form.touched
                        ? form.errors['email']
                        : undefined
                    }
                    onChange={form.handleChange}
                    value={form.values.email}
                  />
                  <FormText
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    errorText={
                      form.submitCount > 0 && form.touched
                        ? form.errors['password']
                        : undefined
                    }
                    onChange={form.handleChange}
                    value={form.values.password}
                  />
                  <FormText
                    id="nationalID"
                    label="National ID"
                    name="nationalID"
                    autoComplete="nationalID"
                    errorText={
                      form.submitCount > 0 && form.touched
                        ? form.errors['nationalID']
                        : undefined
                    }
                    onChange={form.handleChange}
                    value={form.values.nationalID}
                  />
                  <FormText
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    errorText={
                      form.submitCount > 0 && form.touched
                        ? form.errors['phone']
                        : undefined
                    }
                    onChange={form.handleChange}
                    value={form.values.phone}
                  />
                  <FormText
                    id="address"
                    label="Address"
                    name="address"
                    type="textarea"
                    autoComplete="address"
                    errorText={
                      form.submitCount > 0 && form.touched
                        ? form.errors['address']
                        : undefined
                    }
                    onChange={form.handleChange}
                    value={form.values.address}
                  />
                </Box>
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
          </Box>
        </Box>
      </Container>
    </>
  );
});
