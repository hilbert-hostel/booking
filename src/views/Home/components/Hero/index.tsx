import React from 'react';
import Container from '@material-ui/core/Container';
import {
  Typography,
  createStyles,
  makeStyles,
  Theme,
  Paper,
} from '@material-ui/core';
import { RoomSearchForm } from '../../../../core/components/RoomSearchForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hero: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    },
    filter: {
      backdropFilter: 'blur(2px) brightness(0.7)',
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: ' rgba(255,255,255,0.4)',
    },
    textWrapper: {
      position: 'relative',
      width: '100%',
      height: '100%',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      color: 'white',
      minHeight: '250px',
    },
    text: {
      display: 'flex',
      flexDirection: 'column',
      // justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    paper: {
      position: 'relative',
      width: '100%',
      borderRadius: '10px 10px 0 0',
      zIndex: 2,
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    bigButton: {
      // marginTop: theme.spacing(1),
      padding: theme.spacing(2),
    },
    formItem: {
      marginBottom: theme.spacing(1),
    },
    marginTop: {
      marginTop: theme.spacing(1),
    },
  })
);

export const Hero: React.FC<HeroProps> = () => {
  const classes = useStyles();
  return (
    <Container
      style={{
        backgroundImage: `url(${'https://pix10.agoda.net/hotelImages/1165482/-1/781e60570bbaa427b4afa9d66b7d500d.jpg?s=1024x768'})`,
      }}
      className={classes.hero}
      maxWidth="xl"
      disableGutters
      color="inherit"
    >
      <Container maxWidth="xl" className={classes.filter}>
        <></>
      </Container>
      <div className={classes.textWrapper}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom>
            Find a perfect place to stay
          </Typography>
        </Container>
      </div>
      <Paper elevation={1} className={classes.paper}>
        <Container maxWidth="xl">
          <RoomSearchForm onSubmit={console.log} />
        </Container>
      </Paper>
    </Container>
  );
};

export interface HeroProps {}
