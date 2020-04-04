import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from '../../core/hooks/use-stores';
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { Hero } from './components/Hero';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(3),
    },
    button: {
      marginRight: theme.spacing(1),
    },
  })
);

export const Search: React.FC = observer(() => {
  const classes = useStyles();
  const { authStore } = useStores();

  useEffect(() => {
    authStore.fetchUserData();
  }, [authStore]);

  return (
    <>
      <Hero />
      <div className={classes.root}></div>
    </>
  );
});
