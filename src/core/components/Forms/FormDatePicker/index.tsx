import React from 'react';
import { DatePicker, DatePickerProps } from '@material-ui/pickers';
import { FormText } from '../FormText';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formItem: {
      marginBottom: theme.spacing(2),
    },
  })
);

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
  label,
  name,
  value,
  onChange,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <DatePicker
      label={label}
      name={name}
      value={value}
      TextFieldComponent={FormText}
      className={`${classes.formItem}`}
      onChange={date => onChange(date)}
      {...rest}
    />
  );
};

export type FormDatePickerProps = DatePickerProps & {
  value: Date;
  onChange: (value: MaterialUiPickersDate) => void;
};
