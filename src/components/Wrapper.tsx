import { Box } from '@mui/material';
import HeaderNavigationApp from './Header/Header';
import BottomNavigationApp from './Footer/Footer';

export default function Wrapper({ children }) {
  return (
    <Box
      width={'100%'}
      height={'100vh'}
      bgcolor={'#ffffff'}
      display={'flex'}
      flexDirection={'column'}
    >
      <HeaderNavigationApp />
      <Box margin={'0 210px'} flexGrow={'1'}>
        {children}
      </Box>
      <BottomNavigationApp />
    </Box>
  );
}
