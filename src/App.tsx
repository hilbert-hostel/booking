import React, { useEffect } from 'react';
import { AppRouter } from './core/router';
import { ThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { useStores } from './core/hooks/use-stores';
import { observer } from 'mobx-react-lite';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

export const App: React.FC<AppProps> = observer(() => {
  const { themeStore } = useStores();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    themeStore.setDarkMode(prefersDarkMode);
  }, [prefersDarkMode, themeStore]);

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <ThemeProvider theme={themeStore.theme}>
        <AppRouter />
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
});

export interface AppProps {}
