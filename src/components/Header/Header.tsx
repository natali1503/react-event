import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import LeftSide from './assets/LeftSide.svg';

import LogInButton from './LogInButton';
import ImageAvatar from './Avatar';

import { useAppSelector } from '../../hooks/useAppSelector';

// TODO сделать роут к странице запросы о помощи.
// TODO сделать роут к странице мой профиль.

export default function HeaderNavigationApp() {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        width: '100vw',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <AppBar position="static" color="inherit" sx={{ zIndex: '1' }}>
        <Toolbar
          sx={{
            width: '85%',
            maxWidth: '1500px',
            height: '64px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 auto',
            paddingLeft: 'none',
            paddingRight: 'none',
          }}
        >
          <img
            style={{ maxWidth: '220px', height: '40px' }}
            srcSet={LeftSide}
            src={LeftSide}
            alt={'image-title'}
            loading="lazy"
          />
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link
              color="inherit"
              href="#"
              underline="hover"
              sx={{
                fontSize: '16px',
                lineHeight: '150%',
                letterSpacing: '0.15px',
              }}
            >
              Запросы о помощи
            </Link>
          </Box>
          <Box
            sx={{
              width: '220px',
              height: '40px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            {isAuthenticated ? <ImageAvatar /> : <LogInButton />}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
