import React, { useState, useRef } from 'react';
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
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

export const Search: React.FC = observer(() => {
  const classes = useStyles();
  const [isExpanded, setExpanded] = useState(true);
  const ref = useRef();
  const [title, setTitle] = useState('Please select you stay');
  //   const { testStore, authStore } = useStores();

  const updateTitle = (values: RoomSearchFormInput) => {
    setTitle(
      `${moment(values.from).format('MMM Do')} - ${moment(values.to).format(
        'MMM Do'
      )} , ${values.guests} guest(s)`
    );
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
            ref={ref}
            onSubmit={console.log}
            searchButton={false}
            onChange={updateTitle}
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
        <Typography variant="h3" gutterBottom className={classes.text}>
          Search
        </Typography>
      </Container>
    </>
  );
});
