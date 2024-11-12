import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { useMode } from '../../theme';

export default function BottomNavigationApp() {
  const [theme] = useMode();
  return (
    <Box
      bgcolor={theme.palette.background.paper}
      padding={'64px 0'}
      borderTop={`1px solid ${theme.palette.grey[300]}`}
      sx={{
        width: '100vw',
        marginTop: 'auto',
        zIndex: '1',
      }}
    >
      <Stack direction={'row'} justifyContent={'space-around'}>
        <Link
          href="/"
          target="_blank"
          underline="hover"
          sx={{
            color: 'black',
            '&:hover': { color: 'black' },
          }}
        >
          Об ивенте
        </Link>
        <Link
          href="https://github.com/heyhurricane/react-event"
          underline="hover"
          sx={{
            color: 'black',
            '&:hover': { color: 'black' },
          }}
        >
          Github проекта
        </Link>
        <Link
          href="https://t.me/natti_jun_front"
          target="_blank"
          underline="hover"
          sx={{
            color: 'black',
            '&:hover': { color: 'black' },
          }}
        >
          Чат для джунов
        </Link>
      </Stack>
    </Box>
  );
}
