import React, { useState } from 'react';
import { DatePicker, DatePickerProps } from '@material-ui/pickers';
import { FormText } from '../FormText';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formItem: {
      marginBottom: theme.spacing(2),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  })
);

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  name,
  value,
  onChange,
  minDateMessage,
  ...rest
}) => {
  const classes = useStyles();
  const [error, setError] = useState<any>();
  return (
    <DatePicker
      label={label}
      name={name}
      value={value}
      TextFieldComponent={FormText}
      className={`${classes.formItem}`}
      onChange={date => onChange(date)}
      onError={err => {
        setError(err);
      }}
      minDateMessage={minDateMessage}
      error={error}
      {...rest}
    />
  );
};

export type FormDatePickerProps = DatePickerProps & {
  value: Date;
  errorText?: string;
  onChange: (value: MaterialUiPickersDate) => void;
};
