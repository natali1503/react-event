import { createTheme } from '@mui/material/styles';

export const tokens = {
  background: {
    white: '#fff',
    grey: '#f5f6f5',
  },
};
export const themeSettings = (): object => {
  return {
    palette: {
      praimary: { main: '#f5f6f5' },
      secondary: { main: '#f5f6f5' },
      background: {
        paper: '#f5f6f5',
        default: '#fff',
      },
    },

    typography: {
      fontFamily: ['Source Sans', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Source Sans', 'sans-serif'].join(','),
        fontSize: 40,
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
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Source Sans', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Source Sans', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  };
};
type Theme = ReturnType<typeof createTheme>;
export function useMode(): [Theme] {
  const theme = createTheme(themeSettings());
  return [theme];
}
