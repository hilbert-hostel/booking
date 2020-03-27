import React from 'react';
import { observer } from 'mobx-react-lite';
// import { useStores } from '../../core/hooks/use-stores';
import { createStyles, makeStyles, Theme, Box, Fab } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import { useStores } from '../../../../core/hooks/use-stores';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4),
    },
    fab: {
      position: 'sticky',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      float: 'right',
    },
    error: {
      '&.Mui-disabled': {
        opacity: '1',
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.error.contrastText,
      },
      backgroundColor: theme.palette.error.dark,
    },
  })
);

export const RoomSelectFab: React.FC = observer(() => {
  const classes = useStyles();
  const { bookingStore } = useStores();
  const searchQuery = bookingStore.roomSearchInfo;
  const history = useHistory();

  return (
    <>
      <Box className={classes.fab}>
        <Fab
          variant="extended"
          color={
            bookingStore.selected === searchQuery?.guests
              ? 'primary'
              : 'inherit'
          }
          className={
            searchQuery && searchQuery?.guests < bookingStore.selected
              ? classes.error
              : ''
          }
          disabled={
            !(
              (searchQuery && searchQuery?.guests >= bookingStore.selected) ||
              bookingStore.validInfo
            )
          }
          onClick={() =>
            bookingStore.selected === searchQuery?.guests &&
            history.push('/confirm')
          }
        >
          {!bookingStore.validInfo
            ? 'Invalid Dates'
            : bookingStore.selected !== searchQuery?.guests
            ? searchQuery?.guests && searchQuery?.guests < bookingStore.selected
              ? 'Invalid Bed Selection'
              : `${bookingStore.selected}/${searchQuery?.guests} beds selected`
            : 'Confirm Your Booking'}
        </Fab>
      </Box>
    </>
  );
});
