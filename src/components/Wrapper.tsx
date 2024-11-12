import { Box } from '@mui/material';
import HeaderNavigationApp from './Header/Header';
import BottomNavigationApp from './Footer/Footer';
import { useMode } from '../theme';

export default function Wrapper({ children }) {
  const [theme] = useMode();
  return (
    <Box
      width={'100%'}
      bgcolor={theme.palette.background.paper}
      display={'flex'}
      flexDirection={'column'}
      min-height={'100vh'}
    >
      <HeaderNavigationApp />
      <Box margin={'0 110px'} flexGrow={'1'}>
        {children}
      </Box>
      <BottomNavigationApp />
    </Box>
  );
}
