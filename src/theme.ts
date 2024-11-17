import { createTheme } from '@mui/material/styles';

export const themeSettings = (): object => {
  return {
    palette: {
      // primary: { main: '#f5f6f5' },
      secondary: { main: '#f5f6f5' },
      background: {
        default: '#f5f6f5',
        paper: '#fff',
      },
    },

    typography: {
      fontFamily: ['Source Sans', 'sans-serif'].join(','),
      fontSize: 19.6,
      h1: {
        fontFamily: ['Source Sans', 'sans-serif'].join(','),
        fontSize: 30,
      },
      h2: {
        fontFamily: ['Source Sans', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Source Sans', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Source Sans', 'sans-serif'].join(','),
        fontSize: '3.4rem',
        fontWeight: 400,
      },
      h5: {
        fontFamily: ['Source Sans', 'sans-serif'].join(','),
        fontSize: '2.4rem',
        fontWeight: 400,
      },
      h6: {
        fontFamily: ['Source Sans', 'sans-serif'].join(','),
        fontSize: '2rem',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: '1.5rem',
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: '1.2rem',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: '1.6rem',
          },
        },
      },
    },
  };
};
type Theme = ReturnType<typeof createTheme>;
export function useMode(): [Theme] {
  const theme = createTheme(themeSettings());
  return [theme];
}
