import React, { ChangeEvent } from 'react';
import { TextField, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  })
);

export const FormText: React.FC<FormTextProps> = ({
  id,
  name,
  label,
  type = 'text',
  placeholder = label,
  error,
  onChange,
  autoComplete = name,
  helperText,
  value,
}) => {
  const classes = useStyles();
  return (
    <TextField
      id={id}
      label={label}
      name={name}
      type={type}
      error={!!error}
      placeholder={placeholder}
      helperText={error ? error : helperText}
      onChange={onChange}
      value={value}
      variant="filled"
      fullWidth
      autoComplete={autoComplete}
      className={classes.root}
    />
  );
};

export interface FormTextProps {
  id: string;
  name: string;
  type?: string;
  helperText?: string;
  label: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}
