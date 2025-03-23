import { ThemeProvider, CssBaseline } from '@mui/material';

import { useMode } from '../theme';

const Theme = ({ children }) => {
  const [theme] = useMode();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default Theme;
