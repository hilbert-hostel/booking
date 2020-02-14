import { responsiveFontSizes, createMuiTheme } from '@material-ui/core/styles';
import { themeConfig } from '../theme';

export function createThemeStore() {
  // note the use of this which refers to observable instance of the store
  return {
    dark: true as boolean,
    setDarkMode(mode: boolean) {
      this.dark = mode;
    },
    get theme() {
      return responsiveFontSizes(
        createMuiTheme({
          ...themeConfig,
          palette: {
            ...themeConfig.palette,
            type: this.dark ? 'dark' : 'light',
          },
        })
      );
    },
  };
}

export type ThemeStore = ReturnType<typeof createThemeStore>;
