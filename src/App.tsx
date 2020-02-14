import React, { useEffect } from 'react';
import { AppRouter } from './core/router';
import { ThemeProvider } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core';
import { useStores } from './core/hooks/use-stores';
import { observer } from 'mobx-react-lite';

export const App: React.FC<AppProps> = observer(() => {
  const { themeStore } = useStores();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    themeStore.setDarkMode(prefersDarkMode);
  }, [prefersDarkMode, themeStore]);

  return (
    <ThemeProvider theme={themeStore.theme}>
      <AppRouter />
    </ThemeProvider>
  );
});

export interface AppProps {}
