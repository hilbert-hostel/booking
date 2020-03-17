import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
// import { useStores } from '../../core/hooks/use-stores';
import {
  createStyles,
  makeStyles,
  Theme,
  Container,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Divider,
  Box,
  Button,
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
import { Room } from '../../core/models/room';
import { BackendAPI } from '../../core/repository/api/backend';
import { RoomCard } from './components';

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
    },
  })
);

export const SearchResult: React.FC = observer(() => {
  const classes = useStyles();
  const [isExpanded, setExpanded] = useState(true);
  const ref = useRef<any>();
  const [title, setTitle] = useState('Please select you stay');
  const query = useQuery();
  const [searchQuery, setSearchQuery] = useState<RoomSearchFormInput>();
  const [searchResults, setSearchResults] = useState<Room[]>();
  const location = useLocation();
  //   const { testStore, authStore } = useStores();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    if (query.get('checkIn')) {
      ref.current.setForm({
        checkIn: new Date(query.get('checkIn') || ''),
        checkOut:
          query.get('checkOut') !== null
            ? new Date(query.get('checkOut') || '')
            : moment()
                .add('day', 1)
                .toDate(),
        guests: parseInt(query.get('guests') || '1') || 1,
      });
      setExpanded(false);
    }
  }, [location.search]);

  const updateForm = (values: RoomSearchFormInput) => {
    setTitle(
      `${moment(values.checkIn).format('MMM Do')} - ${moment(
        values.checkOut
      ).format('MMM Do')} , ${values.guests} guest(s)`
    );
    setSearchQuery(values);
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
        <Typography variant="h4" gutterBottom className={classes.text}>
          Type of room
        </Typography>
        {searchResults &&
          searchResults.map(room => {
            return (
              <RoomCard key={'room-result-' + room.id} room={room}></RoomCard>
            );
          })}
      </Container>
    </>
  );
});
