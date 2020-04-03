import React from 'react';
import Typography from '@material-ui/core/Typography';

import {
  createStyles,
  makeStyles,
  Theme,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Button,
  Box,
  Divider,
} from '@material-ui/core';
import { pluralize } from '../../../../core/utils/text-formatting';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { Reservation } from '../../../../core/models/reservation';
import moment from 'moment';
import { CustomLink } from '../../../../core/components/CustomLink';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1),
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
    paymentNotCompleted: {
      padding: theme.spacing(1),
      // marginBottom: theme.spacing(1),
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
      fontWeight: 'bold',
    },
    divider: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

export const ReservationCard: React.FC<ReservationCardProps> = observer(
  ({ reservation, onClick = () => {} }) => {
    const classes = useStyles();
    const history = useHistory();

    const getByType = () => {
      const fromType = reservation.rooms.reduce((p, c) => {
        if (c.type in p) {
          return { ...p, [c.type]: p[c.type] + 1 };
        } else {
          return { ...p, [c.type]: 1 };
        }
      }, {} as { [key: string]: number });
      return Object.keys(fromType)
        .map(k => fromType[k] + 'x ' + k)
        .join(', ');
    };

    return (
      <>
        <Card className={classes.root}>
          {reservation.rooms[0].photos[0] && (
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
          )}
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
                    'bed',
                    reservation.rooms.reduce((p, c) => p + c.beds, 0)
                  )}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Rooms: {getByType()}{' '}
                </Typography>
              </Box>
              <Box
                flexShrink="1"
                fontWeight="fontWeightBold"
                fontSize={24}
                width="fit-content"
                whiteSpace="nowrap"
                alignSelf="flex-end"
              >
                {reservation.rooms.reduce((p, c) => p + c.price * c.beds, 0)}{' '}
                THB
              </Box>
            </Box>
          </CardContent>
          {/* </CardActionArea> */}
          <CardActions>
            <Button size="small" color="primary">
              <CustomLink to={'/reservation/' + reservation.id}>
                View Details
              </CustomLink>
            </Button>
          </CardActions>
          {!reservation.isPaid && (
            <CardActionArea
              onClick={() => history.push('/payment/' + reservation.id)}
            >
              <CardContent className={classes.paymentNotCompleted}>
                <Typography align="center" variant="h5" gutterBottom={false}>
                  Payment not Completed
                </Typography>
              </CardContent>
            </CardActionArea>
          )}
        </Card>

        <Divider variant="middle" className={classes.divider}></Divider>
      </>
    );
  }
);

export interface ReservationCardProps {
  reservation: Reservation;
  onClick?: (room: Reservation) => void;
}
