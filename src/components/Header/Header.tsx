import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const/const';

import LogInButton from './LogInButton';
import ImageAvatar from './Avatar';

import { useAppSelector } from '../../hooks/useAppSelector';
import { useMode } from '../../theme';
import { Logo } from './Logo';

export default function HeaderNavigationApp() {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);

  const handleClickRequest = (event: React.MouseEvent<HTMLElement>) => {
    navigate(AppRoute.Main, { replace: true });
  };
  const [theme] = useMode();
  return (
    <Box
      bgcolor={theme.palette.background.default}
      sx={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <AppBar position="static" color="inherit" sx={{ zIndex: '1' }}>
        <Toolbar
          sx={{
            width: '100%',
            height: '64px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingLeft: 'none',
            paddingRight: 'none',
          }}
        >
          <Logo />
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Link
              onClick={handleClickRequest}
              color="inherit"
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
