import { Box, Link } from '@mui/material';
import { useMode } from '../../theme';

export default function BottomNavigationApp() {
  const [theme] = useMode();
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      justifyContent={'space-between'}
      bgcolor={theme.palette.background.paper}
      padding={'calc(6.4rem + 0.033 * (100vw - 192rem)) 0'}
      borderTop={`1px solid ${theme.palette.grey[300]}`}
      height={'15rem'}
      alignItems={'center'}
      sx={{
        width: '100vw',
        marginTop: 'auto',
        zIndex: '1',
        [`@media (max-width:${theme.breakpoints.values.lg}px)`]: {
          padding: '0 7rem',
        },
        [`@media (max-width:${theme.breakpoints.values.md}px)`]: {
          padding: '0 2rem',
        },
        [`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
          padding: '0 0',
        },
      }}
    >
      <Box display={'flex'} justifyContent={'flex-start'}>
        <Link
          href="/"
          fontSize={'16px'}
          target="_blank"
          underline="hover"
          sx={{
            color: 'black',
            '&:hover': { color: 'black' },
          }}
        >
          Об ивенте
        </Link>
      </Box>
      <Box display={'flex'}>
        <Link
          href="https://github.com/heyhurricane/react-event"
          underline="hover"
          fontSize={'16px'}
          sx={{
            color: 'black',
            '&:hover': { color: 'black' },
          }}
        >
          Github проекта
        </Link>
      </Box>
      <Box display={'flex'} justifyContent={'flex-end'}>
        <Link
          href="https://t.me/natti_jun_front"
          target="_blank"
          underline="hover"
          fontSize={'16px'}
          sx={{
            color: 'black',
            '&:hover': { color: 'black' },
          }}
        >
          Чат для джунов
        </Link>
      </Box>
    </Box>
  );
}
