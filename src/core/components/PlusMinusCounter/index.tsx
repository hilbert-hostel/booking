import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PlusIcon from '@material-ui/icons/Add';
import MinusIcon from '@material-ui/icons/Remove';
import {
  createStyles,
  makeStyles,
  Theme,
  Box,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
  })
);

export const PlusMinusCounter: React.FC<PlusMinusCounterProps> = ({
  value,
  onChange,
  invalid = false,
  disabled = false,
}) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center">
      <IconButton disabled={value == 0} onClick={() => onChange(value - 1)}>
        <MinusIcon />
      </IconButton>
      <Typography variant="body1" color={invalid ? 'error' : 'textPrimary'}>
        {value}
      </Typography>
      <IconButton disabled={disabled} onClick={() => onChange(value + 1)}>
        <PlusIcon />
      </IconButton>
    </Box>
  );
};

export interface PlusMinusCounterProps {
  onChange: (value: number) => void;
  value: number;
  disabled?: boolean;
  invalid?: boolean;
}
