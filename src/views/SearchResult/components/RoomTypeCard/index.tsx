import React, { useState } from 'react';
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
  Collapse,
  IconButton,
  List,
  ListItem,
} from '@material-ui/core';
import { Room, RoomTypeResult } from '../../../../core/models/room';
import { toSentenceCase } from '../../../../core/utils/text-formatting';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { PlusMinusCounter } from '../../../../core/components/PlusMinusCounter';
import { useStores } from '../../../../core/hooks/use-stores';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(2),
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

export const RoomTypeCard: React.FC<RoomCardProps> = observer(
  ({ roomType, onClick = () => {} }) => {
    const { bookingStore } = useStores();
    const [expanded, setExpanded] = useState(true);
    const classes = useStyles();
    return (
      <Card className={classes.root}>
        {/* <CardActionAnrea> */}
        {roomType.photos[0] && (
          <CardMedia
            component="img"
            alt={roomType.photos[0].photo_description || roomType.type}
            height="140"
            image={roomType.photos[0].photo_url}
            title={roomType.type}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {roomType.type}
          </Typography>
          <Box display="flex" width="100%" alignItems="stretch">
            <Box width="100%" height="100%" flexGrow="1">
              <Typography variant="body2" color="textSecondary" component="p">
                {roomType.description}
              </Typography>
              <br />
              <Typography variant="body2" color="textSecondary" component="p">
                Facilities :{' '}
                {roomType.facilities
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
              {roomType.price} THB
            </Box>
          </Box>
        </CardContent>
        {/* </CardActionArea> */}
        <CardActions>
          <Button size="small" color="primary">
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
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent className={classes.noPaddingTopBottom}>
            <List className={classes.noPaddingTopBottom}>
              {roomType.availability.map(room => {
                const amount = bookingStore.getSelectRoomAmount(room.id) || 0;
                return (
                  <ListItem
                    className={classes.roomItem}
                    key={'card-' + roomType.type + '-' + room.id}
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
        </Collapse>
      </Card>
    );
  }
);

export interface RoomCardProps {
  roomType: RoomTypeResult;
  onClick?: (room: Room) => void;
}
