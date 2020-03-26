import React, { useState, useMemo, useEffect } from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  ListItem,
  List,
  CardActions,
  Collapse,
} from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PlusMinusCounter } from '../../core/components/PlusMinusCounter';
import BackArrow from '@material-ui/icons/ArrowBackIos';
import { toSentenceCase } from '../../core/utils/text-formatting';
import { useStores } from '../../core/hooks/use-stores';
import { observer } from 'mobx-react-lite';
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
    expand: {
      transform: 'rotate(0deg) translateY(3px)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    expandBtn: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    roomItem: {
      paddingLeft: '0px',
      paddingTop: '0px',
      paddingRight: '0px',
    },
    noPaddingTopBottom: {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
  })
);

export const RoomDetails: React.FC = observer(() => {
  const classes = useStyles();
  const { type } = useParams();
  const history = useHistory();
  const [expanded, setExpanded] = useState(true);
  const { bookingStore } = useStores();
  const roomType = bookingStore.getCurrentRoomType(type as string);

  useEffect(() => {
    if (!roomType) {
      bookingStore.fetchSearchResults();
    }
  }, [roomType]);

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
        <Card className={classes.root}>
          {/* <CardActionAnrea> */}
          {roomType?.photos[0] && (
            <CardMedia
              component="img"
              alt={roomType?.photos[0].photo_description || roomType?.type}
              height="140"
              image={roomType?.photos[0].photo_url}
              title={roomType?.type}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {roomType?.type}
            </Typography>
            <Box display="flex" width="100%" alignItems="stretch">
              <Box width="100%" height="100%" flexGrow="1">
                <Typography variant="body2" color="textSecondary" component="p">
                  {roomType?.description}
                </Typography>
                <br />
                <Typography variant="body2" color="textSecondary" component="p">
                  Facilities :{' '}
                  {roomType?.facilities
                    .map(e => toSentenceCase(e.name))
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
                {roomType?.price} THB
              </Box>
            </Box>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => history.push('/search/rooms/' + roomType?.type)}
            >
              View Details
            </Button>
            <Button
              onClick={() => setExpanded(e => !e)}
              aria-expanded={expanded}
              aria-label="show more"
              size="small"
              color="primary"
            >
              <Box className={classes.expandBtn}>
                <Typography variant="body2" color="primary" component="p">
                  See available rooms
                </Typography>{' '}
                <div
                  className={
                    classes.expand + (expanded ? ' ' + classes.expandOpen : '')
                  }
                >
                  <ExpandMoreIcon />
                </div>
              </Box>
            </Button>
          </CardActions>
          <CardContent className={classes.noPaddingTopBottom}>
            <List className={classes.noPaddingTopBottom}>
              {roomType?.availability.map(room => {
                const amount = bookingStore.getSelectRoomAmount(room.id) || 0;
                return (
                  <ListItem
                    className={classes.roomItem}
                    key={'card-' + roomType?.type + '-' + room.id}
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      width="100%"
                    >
                      <Typography variant="body1">Room {room.id}</Typography>
                      <Box display="flex" alignItems="center">
                        Available : {room.available}
                        <PlusMinusCounter
                          value={amount}
                          onChange={value =>
                            bookingStore.selectRooms(room.id, value)
                          }
                          invalid={bookingStore.invalid}
                          disabled={
                            !(amount < room.available && bookingStore.canSelect)
                          }
                        />
                      </Box>
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </CardContent>
        </Card>
      </Container>
    </>
  );
});
