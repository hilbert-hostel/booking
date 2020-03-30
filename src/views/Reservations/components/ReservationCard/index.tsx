import React from 'react';
import Typography from '@material-ui/core/Typography';

import {
  createStyles,
  makeStyles,
  Theme,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@material-ui/core';
import { pluralize } from '../../../../core/utils/text-formatting';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { Reservation } from '../../../../core/models/reservation';
import moment from 'moment';
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

export const ReservationCard: React.FC<ReservationCardProps> = observer(
  ({ reservation, onClick = () => {} }) => {
    const classes = useStyles();
    const history = useHistory();

    return (
      <Card className={classes.root}>
        {/* {reservation.rooms[0].photos[0] && (
          <CardMedia
            component="img"
            alt={
              reservation.rooms[0].photos[0].photo_description ||
              reservation.rooms[0].type
            }
            height="140"
            image={reservation.rooms[0].photos[0].photo_url}
            title={reservation.rooms[0].type}
          />
        )} */}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {moment(reservation.checkIn).format('DD MMM YYYY')} -{' '}
            {moment(reservation.checkOut).format('DD MMM YYYY')}
          </Typography>
          <Box display="flex" width="100%" alignItems="stretch">
            <Box width="100%" height="100%" flexGrow="1">
              <Typography variant="body2" color="textSecondary" component="p">
                {moment(reservation.checkOut).diff(
                  moment(reservation.checkIn),
                  'd'
                )}{' '}
                {pluralize(
                  'day',
                  moment(reservation.checkOut).diff(
                    moment(reservation.checkIn),
                    'd'
                  )
                )}
                , {reservation.rooms.reduce((p, c) => p + c.beds, 0)}{' '}
                {pluralize(
                  'guest',
                  reservation.rooms.reduce((p, c) => p + c.beds, 0)
                )}
              </Typography>
              <br />
              <Typography
                variant="body2"
                color="textSecondary"
                component="p"
              ></Typography>
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
              {reservation.rooms[0].price} THB
            </Box>
          </Box>
        </CardContent>
        {/* </CardActionArea> */}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => history.push('/reservation/' + reservation.id)}
          >
            View Details
          </Button>
        </CardActions>
      </Card>
    );
  }
);

export interface ReservationCardProps {
  reservation: Reservation;
  onClick?: (room: Reservation) => void;
}
