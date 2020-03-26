import React, { ChangeEvent, ReactNode } from 'react';
import {
  TextField,
  makeStyles,
  Theme,
  createStyles,
  TextFieldProps,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
      // paddingLeft: theme.spacing(1),
      // paddingRight: theme.spacing(1),
      width: '100%',
    },
  })
);

export const FormText: React.FC<FormTextProps> = ({
  id,
  name,
  label,
  type = 'text',
  placeholder = label,
  errorText,
  error = !!errorText,
  onChange,
  autoComplete = name,
  helperText,
  value,
  variant,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TextField
        id={id}
        label={label}
        name={name}
        type={type}
        error={!!error}
        //   placeholder={}
        helperText={error ? error || errorText : helperText}
        onChange={onChange}
        value={value}
        variant="filled"
        fullWidth
        autoComplete={autoComplete}
        {...rest}
      />
    </div>
  );
};

export type FormTextProps = TextFieldProps & {
  id?: string;
  name?: string;
  type?: string;
  helperText?: string | ReactNode;
  label?: string | ReactNode;
  placeholder?: string;
  autoComplete?: string;
  error?: boolean;
  errorText?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | unknown;
};
