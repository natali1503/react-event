import { createTheme } from '@mui/material/styles';

export const themeSettings = (): object => {
  return {
    palette: {
      mode: 'light',
      primary: {
        main: '#1E88E5',
      },
      secondary: {
        main: '#f50057',
      },
      background: {
        paper: '#ffffff',
        default: '#f5f6f5',
      },
      grey: { 300: '#e0e0e0' },
    },
  };
};
type Theme = ReturnType<typeof createTheme>;
export function useMode(): [Theme] {
  const theme = createTheme(themeSettings());
  return [theme];
}
