import { ThemeProvider, CssBaseline } from '@mui/material';

import { useMode } from '../theme';

export function Theme({ children }) {
  const [theme] = useMode();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
