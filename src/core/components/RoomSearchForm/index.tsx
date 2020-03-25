import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  Button,
  Box,
} from '@material-ui/core';
import { useFormik } from 'formik';
import moment from 'moment';
import { RoomSearchFormInput } from '../../models/search';
import { FormText } from '../Forms/FormText';
import { roomSearchFormSchema } from './schema';
import { FormDatePicker } from '../Forms/FormDatePicker';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
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

export const RoomSearchForm: React.FC<RoomSearchFormProps> = forwardRef(
  ({ initial, onSubmit, searchButton = true, onChange }, ref) => {
    const form = useFormik<RoomSearchFormInput>({
      validationSchema: roomSearchFormSchema,
      initialValues: {
        guests: initial?.guests || 1,
        checkIn: new Date(initial?.checkIn || ''),
        checkOut: initial?.checkOut
          ? new Date(initial?.checkOut || '')
          : moment()
              .add('day', 1)
              .toDate(),
      } || {
        checkIn: new Date(),
        checkOut: moment()
          .add(1, 'day')
          .toDate(),
        guests: 1,
      },
      onSubmit: values => onSubmit && onSubmit(values),
    });
    const classes = useStyles();

    if (onChange) {
      useEffect(() => {
        onChange(form.values);
      }, [form.values, onChange]);
    }

    useImperativeHandle(ref, () => ({
      submitForm: () => form.submitForm(),
      getForm: () => form,
      setForm: (values: RoomSearchFormInput) => form.setValues(values),
    }));

    return (
      <form className={classes.root} onSubmit={form.handleSubmit}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          maxWidth="xl"
        >
          <FormDatePicker
            label="Check In"
            name="checkIn"
            value={form.values.checkIn}
            minDate={new Date()}
            className={`${classes.formItem} ${classes.marginTop}`}
            onChange={date => form.setFieldValue('checkIn', date?.toDate())}
          />
          <FormDatePicker
            label="Check Out"
            name="checkOut"
            value={form.values.checkOut}
            minDate={form.values.checkIn}
            className={classes.formItem}
            onChange={date => form.setFieldValue('checkOut', date?.toDate())}
          />
          <FormText
            id="guests"
            label="Guests"
            type="number"
            name="guests"
            value={form.values.guests}
            onChange={form.handleChange}
            errorText={form.errors && form.errors.guests}
          />
          {searchButton && (
            <Button
              variant="contained"
              color="primary"
              className={classes.bigButton}
              onClick={() => form.submitForm()}
            >
              Search
            </Button>
          )}
        </Box>
      </form>
    );
  }
);

export interface RoomSearchFormProps {
  onSubmit?: (values: RoomSearchFormInput) => void;
  searchButton?: boolean;
  ref?: React.Ref<any>;
  onChange?: (values: RoomSearchFormInput) => void;
  initial?: RoomSearchFormInput;
}
