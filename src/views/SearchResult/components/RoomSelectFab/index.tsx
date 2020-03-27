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
          onClick={() => history.push('/confirm')}
        >
          {bookingStore.selected !== searchQuery?.guests
            ? `${bookingStore.selected}/${searchQuery?.guests} rooms selected`
            : 'Confirm Your Booking'}
        </Fab>
      </Box>
    </>
  );
});
