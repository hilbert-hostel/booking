import React, { useEffect, useState } from 'react';
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
import { EditProfileModel } from '../../../../core/models/registration';
import { FormText } from '../../../../core/components/Forms/FormText';
import { TitleBar } from '../../../../core/components/TitleBar';
import { BackendAPI } from '../../../../core/repository/api/backend';
import { useStores } from '../../../../core/hooks/use-stores';
import * as Yup from 'yup';
import { handleServerError } from '../../../../core/utils/handleServerError';
import { autorun } from 'mobx';

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
      marginBottom: theme.spacing(2),
      width: '100%',
    },
    form: {
      padding: '',
    },
  })
);

export const editProfileSchema = Yup.object<EditProfileModel>({
  firstname: Yup.string().required('Please enter your first name'),
  lastname: Yup.string().required('Please enter your last name'),
  address: Yup.string().required('Please enter your address'),
  phone: Yup.string()
    .required('Please enter your phone number')
    .matches(/^0[0-9]{9}$/g, 'Invalid Phone number format'),
  nationalID: Yup.string()
    .required('Please enter your national ID')
    .matches(
      /^[0-9]{13}$/g,
      'Invalid National ID, National ID Card has to be 13 Characters'
    ),
});

export const EditProfile: React.FC = observer(() => {
  const classes = useStyles();
  const history = useHistory();
  const { authStore, snackbarStore } = useStores();
  const [init, setInit] = useState(false);
  const form = useFormik<EditProfileModel>({
    validationSchema: editProfileSchema,
    initialValues: {
      firstname: '',
      lastname: '',
      address: '',
      nationalID: '',
      phone: '',
    },
    onSubmit: async values => {
      try {
        await BackendAPI.editProfile(values);
        snackbarStore.sendMessage({
          message: 'Profile Updated',
          type: 'success',
        });
        history.push('/profile');
      } catch (error) {
        handleServerError(error, snackbarStore);
      }
    },
  });

  useEffect(() => {
    autorun(() => {
      if (!init) {
        if (authStore.user) {
          setInit(true);
          form.setValues({
            ...authStore.user,
            nationalID: authStore.user.national_id,
          });
        }
      }
    });
  }, [init, authStore, form]);

  return (
    <>
      <TitleBar title="Edit Profile" backTo="/profile" />
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
                      form.submitCount > 0 || form.touched.firstname
                        ? form.errors['firstname']
                        : undefined
                    }
                    onBlur={form.handleBlur}
                    onChange={form.handleChange}
                    value={form.values.firstname}
                  />
                  <FormText
                    id="lastname"
                    label="Last name"
                    name="lastname"
                    autoComplete="lname"
                    errorText={
                      form.submitCount > 0 || form.touched.lastname
                        ? form.errors['lastname']
                        : undefined
                    }
                    onBlur={form.handleBlur}
                    onChange={form.handleChange}
                    value={form.values.lastname}
                  />
                  <FormText
                    id="nationalID"
                    label="National ID"
                    name="nationalID"
                    autoComplete="nationalID"
                    errorText={
                      form.submitCount > 0 || form.touched.nationalID
                        ? form.errors['nationalID']
                        : undefined
                    }
                    onBlur={form.handleBlur}
                    onChange={form.handleChange}
                    value={form.values.nationalID}
                  />
                  <FormText
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    errorText={
                      form.submitCount > 0 || form.touched.phone
                        ? form.errors['phone']
                        : undefined
                    }
                    onBlur={form.handleBlur}
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
                      form.submitCount > 0 || form.touched.address
                        ? form.errors['address']
                        : undefined
                    }
                    onBlur={form.handleBlur}
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
                  Edit Profile
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
});
