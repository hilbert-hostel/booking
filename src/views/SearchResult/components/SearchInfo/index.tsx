import React, { useState, useRef, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
// import { useStores } from '../../core/hooks/use-stores';
import {
  createStyles,
  makeStyles,
  Theme,
  Typography,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  withStyles,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { RoomSearchForm } from '../../../../core/components/RoomSearchForm';
import { RoomSearchFormInput } from '../../../../core/models/search';
import moment from 'moment';
import { useLocation, useHistory } from 'react-router-dom';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import { useStores } from '../../../../core/hooks/use-stores';
import { LocalStorage } from '../../../../core/repository/localStorage';
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

export const SearchInfo: React.FC = observer(() => {
  const classes = useStyles();
  const [isExpanded, setExpanded] = useState(true);
  const ref = useRef<any>();
  const [title, setTitle] = useState('Please select you stay');
  const { bookingStore } = useStores();
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
    bookingStore.setRoomSearchInfo(values);
  };

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
            initial={new LocalStorage('roomSearchInfo').value}
            ref={ref}
            searchButton={false}
            onChange={data => updateForm(data)}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
});
