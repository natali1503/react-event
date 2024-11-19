import { Box } from '@mui/material';
import HeaderNavigationApp from './Header/Header';
import BottomNavigationApp from './Footer/Footer';
import { useMode } from '../theme';

export default function Wrapper({ children }) {
  const [theme] = useMode();
  return (
    <Box
      width={'100%'}
      minHeight={'100vh'}
      bgcolor={theme.palette.background.paper}
      display={'flex'}
      flexDirection={'column'}
    >
      <HeaderNavigationApp />
      <Box
        margin={'0 calc(21rem + 0.109375 * (100vw - 192rem))'}
        flexGrow={'1'}
        display={'flex'}
        sx={{
          [`@media (max-width:${theme.breakpoints.values.lg}px)`]: {
            margin: '0 7rem',
          },
          [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
            margin: '0 2rem',
          },
          [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
            margin: '0 0',
          },
        }}
      >
        {children}
      </Box>
      <BottomNavigationApp />
    </Box>
  );
}
