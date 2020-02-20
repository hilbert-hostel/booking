import React from 'react';
import Container from '@material-ui/core/Container';
import {
  Typography,
  createStyles,
  makeStyles,
  Theme,
  Button,
  Paper,
  Box,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { useFormik } from 'formik';
import { RoomSearchForm } from '../../../../core/models/search';
import { roomSearchFormSchema } from './schema';
import { FormText } from '../../../../core/components/Forms/FormText';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hero: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    },
    filter: {
      backdropFilter: 'blur(2px) brightness(0.7)',
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: ' rgba(255,255,255,0.4)',
    },
    textWrapper: {
      position: 'relative',
      width: '100%',
      height: '100%',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      color: 'white',
      minHeight: '250px',
    },
    text: {
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    paper: {
      position: 'relative',
      width: '100%',
      borderRadius: '10px 10px 0 0',
      zIndex: 2,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    bigButton: {
      // marginTop: theme.spacing(1),
      padding: theme.spacing(2),
    },
    formItem: {
      marginBottom: theme.spacing(1),
    },
    marginTop: {
      marginTop: theme.spacing(1),
    },
  })
);

export const Hero: React.FC<HeroProps> = () => {
  const classes = useStyles();
  const form = useFormik<RoomSearchForm>({
    validationSchema: roomSearchFormSchema,
    initialValues: {
      from: new Date(),
      to: moment()
        .add(1, 'day')
        .toDate(),
      guests: 1,
    },
    onSubmit: async values => {
      try {
        // const res = await BackendAPI.login(values);
        // authStore.setToken(res.data.token);
        // history.push('/');
      } catch (error) {}
    },
  });
  return (
    <Container
      style={{
        backgroundImage: `url(${'https://pix10.agoda.net/hotelImages/1165482/-1/781e60570bbaa427b4afa9d66b7d500d.jpg?s=1024x768'})`,
      }}
      className={classes.hero}
      maxWidth="xl"
      disableGutters
      color="inherit"
    >
      <Container maxWidth="xl" className={classes.filter}>
        <></>
      </Container>
      <div className={classes.textWrapper}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Find a perfect place to stay
          </Typography>
        </Container>
      </div>
      <Paper elevation={1} className={classes.paper}>
        <Container maxWidth="xl">
          <form onSubmit={form.handleSubmit}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="stretch"
              maxWidth="xl"
            >
              <DatePicker
                label="From"
                name="from"
                value={form.values.from}
                minDate={new Date()}
                TextFieldComponent={FormText}
                className={`${classes.formItem} ${classes.marginTop}`}
                onChange={date => form.setFieldValue('from', date?.toDate())}
              />
              <DatePicker
                label="To"
                name="to"
                value={form.values.to}
                minDate={form.values.from}
                TextFieldComponent={FormText}
                className={classes.formItem}
                onChange={date => form.setFieldValue('to', date?.toDate())}
              />
              <FormText
                id="guests"
                label="Guests"
                type="number"
                name="guests"
                value={form.values.guests}
                onChange={form.handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                className={classes.bigButton}
                onClick={() => form.submitForm()}
              >
                Search
              </Button>
            </Box>
          </form>
        </Container>
      </Paper>
    </Container>
  );
};

export interface HeroProps {}
