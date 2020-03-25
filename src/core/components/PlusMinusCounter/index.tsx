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
  disabled = false,
}) => {
  const classes = useStyles();
  return (
    <Box>
      <IconButton disabled={value == 0} onClick={() => onChange(value - 1)}>
        <MinusIcon />
      </IconButton>{' '}
      {value}
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
}
