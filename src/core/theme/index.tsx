import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { indigo, amber } from '@material-ui/core/colors';

export const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: indigo,
      secondary: amber,
    },
  })
);
