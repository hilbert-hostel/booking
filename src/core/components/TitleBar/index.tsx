import React from 'react';
import { observer } from 'mobx-react-lite';
// import { useStores } from '../../core/hooks/use-stores';
import {
  createStyles,
  makeStyles,
  Theme,
  Box,
  Typography,
  Paper,
} from '@material-ui/core';
import BackArrow from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: 0,
    },
    text: {
      color: theme.palette.text.primary,
    },
    fab: {
      position: 'sticky',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
      float: 'right',
    },
  })
);

export const TitleBar: React.FC<TitleBarProps> = observer(
  ({ onBack, title }) => {
    const classes = useStyles();
    const history = useHistory();

    return (
      <>
        <Paper className={classes.root}>
          <Box
            display="flex"
            justifyContent="flex-start"
            alignItems="stretch"
            padding={2}
          >
            <BackArrow onClick={() => (onBack ? onBack() : history.goBack())} />
            <Typography variant="h4" className={classes.text}>
              {title}
            </Typography>
          </Box>
        </Paper>
      </>
    );
  }
);

export interface TitleBarProps {
  title: string;
  onBack?: () => void;
}
