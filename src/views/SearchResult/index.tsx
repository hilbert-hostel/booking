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
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FilterIcon from '@material-ui/icons/FilterList';
import SortIcon from '@material-ui/icons/Sort';
import { RoomSearchForm } from '../../core/components/RoomSearchForm';
import { RoomSearchFormInput } from '../../core/models/search';
import moment from 'moment';
import { useQuery } from '../../core/hooks/use-query';
import { toQuerystring } from '../../core/utils/querystring';
import { useLocation, useHistory } from 'react-router-dom';
import { Room, RoomTypeResult } from '../../core/models/room';
import { BackendAPI } from '../../core/repository/api/backend';
import { RoomTypeCard } from './components/RoomTypeCard';
import BackArrow from '@material-ui/icons/ArrowBackIos';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import { useStores } from '../../core/hooks/use-stores';
import { LocalStorage } from '../../core/repository/localStorage';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
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
  const [isExpanded, setExpanded] = useState(true);
  const ref = useRef<any>();
  const [title, setTitle] = useState('Please select you stay');
  const { bookingStore } = useStores();
  const [searchQuery, setSearchQuery] = useState<RoomSearchFormInput>();
  const [searchResults, setSearchResults] = useState<RoomTypeResult[]>();
  const location = useLocation();
  const history = useHistory();

  const queryData = useMemo(() => {
    const query = new URLSearchParams(location.search);
    if (query.get('checkIn')) {
      return {
        checkIn: new Date(query.get('checkIn') || ''),
        checkOut:
          query.get('checkOut') !== null
            ? new Date(query.get('checkOut') || '')
            : moment()
                .add('day', 1)
                .toDate(),
        guests: parseInt(query.get('guests') || '1') || 1,
      };
      // setExpanded(false);
    }
  }, [location.search]);

  useEffect(() => {
    if (queryData) {
      ref.current.setForm(queryData);
      setExpanded(false);
      history.push('/search/result');
    } else {
      ref.current.setForm(new LocalStorage('roomSearchInfo').value);
      setExpanded(false);
    }
  }, [queryData, history]);

  const updateForm = (values: RoomSearchFormInput) => {
    setTitle(
      `${moment(values.checkIn).format('MMM Do')} to ${moment(
        values.checkOut
      ).format('MMM Do')} , ${values.guests} guest${
        values.guests > 1 ? 's' : ''
      }`
    );
    setSearchQuery(values);
    bookingStore.setRoomSearchInfo(values);
  };

  useEffect(() => {
    if (searchQuery) {
      BackendAPI.searchRooms({
        checkIn: moment(searchQuery.checkIn).format('YYYY-MM-DD'),
        checkOut: moment(searchQuery.checkIn).format('YYYY-MM-DD'),
        guests: searchQuery.guests,
      }).then(res => setSearchResults(res.data));
    }
  }, [searchQuery]);

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
      <ExpansionPanel
        className={classes.expansionPanel}
        expanded={isExpanded}
        onChange={(_, expanded) => setExpanded(expanded)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panel}>
          <RoomSearchForm
            initial={new LocalStorage('roomSearchInfo').value}
            ref={ref}
            onSubmit={console.log}
            searchButton={false}
            onChange={data => updateForm(data)}
          />
        </ExpansionPanelDetails>
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
        {searchResults &&
          searchResults.map(room => {
            return (
              <RoomTypeCard
                key={'room-result-' + room.type}
                roomType={room}
              ></RoomTypeCard>
            );
          })}
      </Container>
    </>
  );
});
