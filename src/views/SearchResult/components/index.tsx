import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {
  createStyles,
  makeStyles,
  Theme,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@material-ui/core';
import { Room } from '../../../core/models/room';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
    },
  })
);

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onClick = () => {},
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        {room.photo && (
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={room.photo}
            title={room.type}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {room.type}
          </Typography>
          <Box display="flex" width="100%">
            <Box width="100%" flexGrow="1">
              <Typography variant="body2" color="textSecondary" component="p">
                {room.description}
              </Typography>
            </Box>
            <Box
              flexShrink="1"
              fontWeight="fontWeightBold"
              fontSize={24}
              width="fit-content"
              whiteSpace="nowrap"
            >
              {room.price} THB
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export interface RoomCardProps {
  room: Room;
  onClick?: (room: Room) => void;
}
