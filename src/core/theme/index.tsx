import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import { orange, yellow } from '@material-ui/core/colors';

export const themeConfig: ThemeOptions = {
  overrides: {
    MuiButton: {
      containedPrimary: {
        background: 'linear-gradient(97.15deg, #F8A170 14.73%, #FFCD61 97.52%)',
        color: 'white',
        fontWeight: 700,
      },
    },
  },
  palette: {
    primary: orange,
    secondary: yellow,
  },
  shape: {
    borderRadius: 10,
  },
};
