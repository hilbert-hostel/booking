import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
// import { useStores } from '../../core/hooks/use-stores';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Divider,
  Box,
  Button,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  ListItem,
  List,
} from '@material-ui/core';
import { RoomSearchFormInput } from '../../core/models/search';
import moment from 'moment';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Room } from '../../core/models/room';
import { BackendAPI } from '../../core/repository/api/backend';
import BackArrow from '@material-ui/icons/ArrowBackIos';
import { toSentenceCase } from '../../core/utils/text-formatting';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
    },
    expansionPanel: {
      margin: 0,
    },
    card: {
      marginTop: theme.spacing(2),
    },
    text: {
      color: theme.palette.text.primary,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    menu: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    listItem: {
      paddingLeft: 0,
    },
  })
);

export const RoomDetails: React.FC = observer(() => {
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const room: Room = {
    id: 1,
    price: 1500,
    type: 'Double room with bathroom',
    description: '',
    facilities: [
      'hair dryer',
      'toiletries',
      'towels',
      'shower',
      'bathroom',
      'telephone',
      'TV',
      'air conditioning',
      'free bottled water',
      'closet',
      'clothes rack',
    ],
    available: 2,
  };

  return (
    <>
      <Container maxWidth="md" className={classes.root}>
        <Box
          display="flex"
          justifyContent="flex-start"
          alignItems="stretch"
          paddingBottom={2}
        >
          <BackArrow onClick={() => history.goBack()} />
          <Typography variant="h4" className={classes.text}>
            Room Details
          </Typography>
        </Box>
        <Card className={classes.card}>
          <CardActionArea>
            {room.photo && (
              <CardMedia
                component="img"
                alt={room.type}
                height="140"
                image={room.photo}
                title={room.type}
              />
            )}
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {room.type}
              </Typography>
              <Box display="flex" width="100%" alignItems="stretch">
                <Box width="100%" height="100%" flexGrow="1">
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {room.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Facilities :{' '}
                    {room.facilities
                      .map((e: any) => toSentenceCase(e))
                      .join(', ')}
                  </Typography>
                </Box>
                <Box
                  flexShrink="1"
                  fontWeight="fontWeightBold"
                  fontSize={24}
                  width="fit-content"
                  whiteSpace="nowrap"
                  padding={1}
                  alignSelf="flex-end"
                >
                  {room.price} THB
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
          {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Add-ons
              </Typography>
              <Box>
                <List>
                  <ListItem className={classes.listItem}>
                    <Box display="flex" justifyContent="spaced-evenly">
                      <Typography gutterBottom variant="body1">
                        Breakfast
                      </Typography>
                    </Box>
                  </ListItem>
                  <ListItem className={classes.listItem}>
                    <Box display="flex" justifyContent="spaced-evenly">
                      <Typography gutterBottom variant="body1">
                        Pizza
                      </Typography>
                    </Box>
                  </ListItem>
                </List>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Container>
    </>
  );
});
