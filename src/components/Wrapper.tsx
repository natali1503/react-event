import { Box } from '@mui/material';
import HeaderNavigationApp from './Header/Header';
import BottomNavigationApp from './Footer/Footer';

export default function Wrapper({ children }) {
  return (
    <Box
      width={'100vw'}
      height={'100vh'}
      bgcolor={'#ffffff'}
      display={'flex'}
      flexDirection={'column'}
    >
      <HeaderNavigationApp />
      <Box margin={'0 210px'} height={'100vh'} flexGrow={'1'}>
        {children}
      </Box>
      <BottomNavigationApp />
    </Box>
  );
}
