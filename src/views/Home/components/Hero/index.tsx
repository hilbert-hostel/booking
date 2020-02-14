import React from 'react';
import Container from '@material-ui/core/Container';
import {
  Typography,
  createStyles,
  makeStyles,
  Theme,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hero: {
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '300px',
      position: 'relative',
      display: 'flex',
    },
    filter: {
      backdropFilter: 'blur(2px) brightness(1.1)',
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: ' rgba(255,255,255,0.4)',
    },
    text: {
      position: 'relative',
      zIndex: 2,
      margin: 'auto 0',
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
      <Container className={classes.filter}>
        <></>
      </Container>
      <Container className={classes.text} maxWidth="lg">
        <Typography variant="h2">W-Hotel</Typography>
        <Typography variant="h4" gutterBottom>
          Power your stay with technology
        </Typography>
        <Button variant="contained" color="secondary">
          Book A Room
        </Button>
      </Container>
    </Container>
  );
};

export interface HeroProps {}
