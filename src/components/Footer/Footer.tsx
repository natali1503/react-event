import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function BottomNavigationApp() {
  return (
    <Box
      bgcolor={'#fff'}
      padding={'64px 0'}
      sx={{
        width: '100vw',
        borderTop: '1px solid #e0e0e0',
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
          href="https://github.com/nat-davydova/charity_event_back_oct2024/tree/main"
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
