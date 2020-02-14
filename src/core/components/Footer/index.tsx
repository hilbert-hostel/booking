import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      minHeight: '150px',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: theme.spacing(1),
      color: 'white',
    },
    content: {
      flexGrow: 1,
      height: '100%',
    },
    credit: {
      width: '100%',
      backgroundColor: theme.palette.primary.dark,
    },
  })
);

export const Footer: React.FC<FooterProps> = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="xl" disableGutters>
      <Paper elevation={3} className={classes.root} square>
        <Container maxWidth="xl" className={classes.content}>
          <Container maxWidth="lg">
            <Typography variant="h5">Contact Us</Typography>
            <Typography variant="body1">don't</Typography>
          </Container>
        </Container>
        <Container maxWidth="xl" className={classes.credit}>
          <Container maxWidth="lg">
            <Typography variant="subtitle2">
              Copyrighted by Weebstoned Team
            </Typography>
          </Container>
        </Container>
      </Paper>
    </Container>
  );
};

export interface FooterProps {}
