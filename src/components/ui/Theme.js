import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import getCookie from '../../utils/getCookie';

export const DispatchContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`');
});

export const fontFamily = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  '"Helvetica Neue"',
  'Helvetica',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

export default function ThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';
  const [themeOptions, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          paletteType: action.payload.paletteType || state.paletteType,
        };
      default:
        throw new Error(`Unrecognized type ${action.type}`);
    }
  }, {});
  const { paletteType = preferredMode } = themeOptions;
  React.useEffect(() => {
    if (process.browser) {
      const nextPaletteType = getCookie('paletteType') || preferredMode;
      dispatch({
        type: 'CHANGE',
        payload: { paletteType: nextPaletteType },
      });
    }
  }, [preferredMode]);
  const theme = React.useMemo(
    () => createMuiTheme({
      overrides: {},
      props: {
        MuiTextField: {
          InputLabelProps: { shrink: true },
        },
        MuiPaper: {
          square: true,
          elevation: 0,
        },
        MuiCard: {
          square: true,
          elevation: 0,
          variant: 'outlined',
        },
        MuiTable: {
          component: 'div',
        },
        MuiTableBody: {
          component: 'div',
        },
        MuiTableCell: {
          component: 'div',
        },
        MuiTableFooter: {
          component: 'div',
        },
        MuiTableHead: {
          component: 'div',
        },
        MuiTablePagination: {
          component: 'div',
        },
        MuiTableRow: {
          component: 'div',
        },
      },
      palette: {
        type: paletteType,
        background: {
          default: { light: 'rgb(246, 248, 250)', dark: 'rgb(9, 12, 16)' }[paletteType],
          paper: { light: 'rgb(255, 255, 255)', dark: 'rgb(13, 17, 23)' }[paletteType],
        },
        text: {
          primary: { light: 'rgba(0, 0, 0, 0.87)', dark: 'rgb(201, 209, 217)' }[paletteType],
          secondary: { light: 'rgba(0, 0, 0, 0.54)', dark: 'rgb(139, 148, 158)' }[paletteType],
        },
      },
      action: {
        active: { light: 'rgba(0, 0, 0, 0.54)', dark: 'rgb(201, 209, 217)' }[paletteType],
      },
      divider: { light: 'rgba(0, 0, 0, 0.12)', dark: 'rgb(48, 54, 61)' }[paletteType],
      typography: { fontFamily },
    }),
    [paletteType],
  );
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </MuiThemeProvider>
  );
}

export function useChangeTheme() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback((options) => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
}
