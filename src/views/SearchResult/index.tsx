import React, { useState, useRef, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
// import { useStores } from '../../core/hooks/use-stores';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider,
  Box,
  Button,
  withStyles,
  Fab,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import { RoomSearchForm } from '../../core/components/RoomSearchForm';
import { RoomSearchFormInput } from '../../core/models/search';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
import { RoomTypeResult } from '../../core/models/room';
import { BackendAPI } from '../../core/repository/api/backend';
import { RoomTypeCard } from './components/RoomTypeCard';
import BackArrow from '@material-ui/icons/ArrowBackIos';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import { useStores } from '../../core/hooks/use-stores';
import { LocalStorage } from '../../core/repository/localStorage';
import { SearchInfo } from './components/SearchInfo';
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
    fab: {
      position: 'sticky',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      float: 'right',
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

export const SearchResult: React.FC = observer(() => {
  const classes = useStyles();
  const { bookingStore } = useStores();
  const history = useHistory();
  const searchQuery = bookingStore.roomSearchInfo;
  const searchResults = bookingStore.searchResults;

  useEffect(() => {
    if (searchQuery) {
      bookingStore.fetchSearchResults();
    }
  }, [searchQuery, bookingStore]);

  return (
    <>
      <ExpansionPanel expanded={false}>
        <ExpansionPanelSummary
          aria-controls="panel1a-content"
          id="top-panel-header"
        >
          <Box className={classes.topPanel}>
            <BackArrow onClick={() => history.push('/search')} />
            <Typography variant="h4" className={classes.text}>
              Types of room
            </Typography>
          </Box>
        </ExpansionPanelSummary>
      </ExpansionPanel>
      <SearchInfo />
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
        {searchResults ? (
          searchResults.map(room => {
            return (
              <RoomTypeCard
                key={'room-result-' + room.type}
                roomType={room}
              ></RoomTypeCard>
            );
          })
        ) : (
          <></>
        )}
      </Container>
      <Box className={classes.fab}>
        <Fab
          variant="extended"
          color={
            bookingStore.selected === searchQuery?.guests
              ? 'primary'
              : 'inherit'
          }
        >
          {bookingStore.selected !== searchQuery?.guests
            ? `${bookingStore.selected}/${searchQuery?.guests} rooms selected`
            : 'Confirm Your Booking'}
        </Fab>
      </Box>
    </>
  );
});
