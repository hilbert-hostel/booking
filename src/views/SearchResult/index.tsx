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
import { RoomTypeCard } from './components/RoomTypeCard';
import { RoomSelectFab } from './components/RoomSelectFab';
import BackArrow from '@material-ui/icons/ArrowBackIos';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import { useStores } from '../../core/hooks/use-stores';
import { SearchInfo } from './components/SearchInfo';
import { reaction } from 'mobx';
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

export const SearchResult: React.FC = observer(() => {
  const classes = useStyles();
  const { bookingStore } = useStores();
  const history = useHistory();
  const searchResults = bookingStore.searchResults;

  useEffect(() => {
    bookingStore.fetchSearchResults();
    const dispose = reaction(
      () => {
        return bookingStore.roomSearchInfo;
      },
      info => {
        bookingStore.fetchSearchResults();
      },
      {
        delay: 1000,
      }
    );
    return () => dispose();
  }, [bookingStore]);

  return (
    <>
      <ExpansionPanel className={classes.notRounded} expanded={false}>
        <ExpansionPanelSummary
          aria-controls="panel1a-content"
          id="top-panel-header"
        >
          <Box className={classes.topPanel}>
            <BackArrow onClick={() => history.push('/')} />
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
      <RoomSelectFab />
    </>
  );
});
