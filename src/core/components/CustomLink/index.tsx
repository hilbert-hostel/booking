import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      alignItems: 'stretch',
      justifyContent: 'stretch',
      textDecoration: 'none',
      color: 'inherit',
      '& > *': {
        width: '100%',
      },
    },
  })
);

export const CustomLink: React.FC<any> = props => {
  const classes = useStyles();
  return (
    <Link className={classes.root} {...props}>
      {props.children || <></>}
    </Link>
  );
};
