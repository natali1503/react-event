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
      >
        {children}
      </Box>
      <BottomNavigationApp />
    </Box>
  );
}
