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
      // paddingLeft: theme.spacing(1),
      // paddingRight: theme.spacing(1),
      width: '100%',
    },
    marginBottom: {
      marginBottom: theme.spacing(2),
    },
  })
);

// const getVariant = (variant: string) => {
//   switch (variant) {
//     case 'filled':
//       return 'filled' as 'filled';
//     case 'outlined':
//       return 'outlined' as 'outlined';
//     default:
//       return 'starndard' as 'standard';
//   }
// };

export const FormText: React.FC<FormTextProps> = ({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  errorText,
  error = !!errorText,
  onChange,
  autoComplete = name,
  helperText,
  value,
  variant,
  marginBottom = true,
  ...rest
}) => {
  const classes = useStyles();
  return (
    <div
      className={
        classes.root + (marginBottom ? ' ' + classes.marginBottom : '')
      }
    >
      <TextField
        id={id}
        label={label}
        name={name}
        type={type}
        error={!!error}
        placeholder={placeholder || undefined}
        helperText={error ? errorText : helperText}
        onChange={onChange}
        value={value}
        variant={'filled'}
        fullWidth
        autoComplete={autoComplete}
        {...rest}
      >
        <> </>
      </TextField>
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
  multiline?: boolean;
  error?: boolean;
  marginBottom?: boolean;
  errorText?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | unknown;
};
