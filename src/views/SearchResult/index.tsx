import React, { useEffect, useState } from 'react';
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
  Menu,
  MenuItem,
  IconButton,
  Paper,
} from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import { useHistory } from 'react-router-dom';
import { RoomTypeCard } from './components/RoomTypeCard';
import { RoomSelectFab } from './components/RoomSelectFab';
import BackArrow from '@material-ui/icons/ArrowBackIos';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import { useStores } from '../../core/hooks/use-stores';
import { SearchInfo } from './components/SearchInfo';
import { reaction } from 'mobx';
import { handleServerError } from '../../core/utils/handleServerError';
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
    ascendingButton: {
      padding: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(2),
    },
    danger: {
      color: theme.palette.error.main,
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
  const { bookingStore, snackbarStore } = useStores();
  const history = useHistory();
  const { searchResults, suggestions } = bookingStore;
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const [sort, setSort] = useState<{ by?: string; descending: boolean }>({
    descending: false,
  });

  useEffect(() => {
    try {
      bookingStore.fetchSearchResults();
    } catch (error) {
      handleServerError(error, snackbarStore);
    }
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
  }, [bookingStore, snackbarStore]);

  const handleClose = (by?: string) => {
    setSort(sort => ({ ...sort, by }));
    setAnchorEl(undefined);
  };

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
          <div>
            <Button onClick={e => setAnchorEl(e.currentTarget)}>
              Sort By {sort.by && ' : ' + sort.by}
            </Button>
            <IconButton
              onClick={() =>
                setSort(sort => ({ ...sort, descending: !sort.descending }))
              }
              disabled={!sort.by}
            >
              <SortIcon
                style={{
                  transform: sort.descending ? 'scaleY(-1)' : 'scaleY(1)',
                }}
              />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(undefined)}
            >
              <MenuItem onClick={() => handleClose('Type')}>Type</MenuItem>
              <MenuItem onClick={() => handleClose('Price')}>Price</MenuItem>
              <MenuItem onClick={() => handleClose()}>Default</MenuItem>
            </Menu>
          </div>
          <Button
            onClick={() => bookingStore.setSelectedRooms([])}
            className={classes.danger}
          >
            Clear Selection
          </Button>
        </Box>
      </Container>
      <Divider />
      {suggestions && (
        <Container maxWidth="md" className={classes.root}>
          <Typography variant="h5" gutterBottom className={classes.text}>
            Suggestions
          </Typography>
          <Paper>
            <Box display="flex" padding={1}>
              <Box
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Typography variant="h6" className={classes.text}>
                  Lowest Price
                </Typography>
                <ul style={{ flexGrow: 1 }}>
                  {suggestions?.lowestPrice[0].roomConfig.map(e => {
                    return (
                      <li key={'room-lowest-price-' + e.id}>
                        <Typography
                          variant="body2"
                          gutterBottom
                          className={classes.text}
                        >
                          {e.type} Room {e.id} x {e.guests}
                        </Typography>
                      </li>
                    );
                  })}
                </ul>
                <div>
                  <Typography variant="h6" className={classes.text}>
                    Total : {suggestions?.lowestPrice[0].totalPrice} THB{' '}
                    <small>per night</small>
                  </Typography>
                </div>
                <Button
                  color="primary"
                  onClick={() =>
                    bookingStore.setSelectedRooms(
                      suggestions.lowestPrice[0].roomConfig.map(e => ({
                        room: e.id,
                        amount: e.guests,
                      }))
                    )
                  }
                >
                  Select Rooms
                </Button>
              </Box>
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divider}
              />
              <Box
                width="100%"
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Typography variant="h6" className={classes.text}>
                  Least amount of rooms
                </Typography>
                <ul style={{ flexGrow: 1 }}>
                  {suggestions?.lowestNumberOfRooms[0].roomConfig.map(e => {
                    return (
                      <li key={'room-lowest-rooms-' + e.id}>
                        <Typography
                          variant="body2"
                          gutterBottom
                          className={classes.text}
                        >
                          {e.type} Room {e.id} x {e.guests}
                        </Typography>
                      </li>
                    );
                  })}
                </ul>
                <Typography variant="h6" className={classes.text}>
                  Total : {suggestions?.lowestNumberOfRooms[0].totalPrice} THB{' '}
                  <small>per night</small>
                </Typography>
                <Button
                  color="primary"
                  onClick={() =>
                    bookingStore.setSelectedRooms(
                      suggestions.lowestNumberOfRooms[0].roomConfig.map(e => ({
                        room: e.id,
                        amount: e.guests,
                      }))
                    )
                  }
                >
                  Select Rooms
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      )}
      <Divider />
      <Container maxWidth="md" className={classes.root}>
        {searchResults ? (
          sort.descending ? (
            searchResults
              .slice()
              .sort((a, b) => {
                if (sort.by) {
                  const keys: { [key: string]: 'type' | 'price' } = {
                    Type: 'type',
                    Price: 'price',
                  };
                  const key = keys[sort.by] || '';
                  return (b[key] as any) > (a[key] as any) ? 1 : -1;
                } else {
                  return 0;
                }
              })
              .reverse()
              .map(room => {
                return (
                  <RoomTypeCard
                    key={'room-result-' + room.type}
                    roomType={room}
                  ></RoomTypeCard>
                );
              })
          ) : (
            searchResults
              .slice()
              .sort((a, b) => {
                if (sort.by) {
                  const keys: { [key: string]: 'type' | 'price' } = {
                    Type: 'type',
                    Price: 'price',
                  };
                  const key = keys[sort.by] || '';
                  return (b[key] as any) > (a[key] as any) ? 1 : -1;
                } else {
                  return 0;
                }
              })
              .map(room => {
                return (
                  <RoomTypeCard
                    key={'room-result-' + room.type}
                    roomType={room}
                  ></RoomTypeCard>
                );
              })
          )
        ) : (
          <></>
        )}
      </Container>
      <RoomSelectFab />
    </>
  );
});
