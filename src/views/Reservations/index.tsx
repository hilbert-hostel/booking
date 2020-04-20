import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
// import { useStores } from '../../core/hooks/use-stores';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  ExpansionPanelSummary,
  Divider,
  Box,
  Button,
  withStyles,
} from '@material-ui/core';
import FilterIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import { useHistory } from 'react-router-dom';
import BackArrow from '@material-ui/icons/ArrowBackIos';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import { useStores } from '../../core/hooks/use-stores';
import { ReservationCard } from './components/ReservationCard';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
    expansionPanel: {
      margin: 0,
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
    panel: {
      paddingBottom: theme.spacing(1),
      marginTop: 0,
    },
    topPanel: {
      verticalAlign: 'middle',
      display: 'flex',
      alignItems: 'center',
    },
    notRounded: {
      borderTopLeftRadius: '0 !important',
      borderTopRightRadius: '0 !important',
    },
  })
);

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
    width: '100%',
  },
  expanded: {},
})(MuiExpansionPanel);

export const Reservations: React.FC = observer(() => {
  const classes = useStyles();
  const { reservationStore } = useStores();
  const history = useHistory();
  const reservations = reservationStore.reservations;

  useEffect(() => {
    reservationStore.fetchReservations();
  }, [reservationStore]);

  return (
    <>
      <ExpansionPanel className={classes.notRounded} expanded={false}>
        <ExpansionPanelSummary
          aria-controls="panel1a-content"
          id="top-panel-header"
        >
          <Box className={classes.topPanel}>
            <BackArrow onClick={() => history.push('/dashboard')} />
            <Typography variant="h4" className={classes.text}>
              Reservations
            </Typography>
          </Box>
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <Container maxWidth="xl" className={classes.menu}>
        <Box display="flex" justifyContent="space-between">
          <Button>
            Sort　
            <SortIcon />
          </Button>
          <Button>
            Filter <FilterIcon />
          </Button>
        </Box>
      </Container>
      <Divider />
      <Container maxWidth="md" className={classes.root}>
        {reservations ? (
          reservations.map(reservation => {
            return (
              <ReservationCard
                key={'reservation-card-' + reservation.id}
                reservation={reservation}
              ></ReservationCard>
            );
          })
        ) : (
          <></>
        )}
      </Container>
    </>
  );
});
