import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';

import LogInButton from './LogInButton';
import ImageAvatar from './Avatar'

const isUserLogged: boolean = true // передавать статус пользьзователя залогинен/нет в формате boolean

export default function Header() {
  return (
    <Box 
      sx={{ 
        backgroundColor: 'white', 
        width: '100vw', 
        height: '84px', 
        margin: '0 auto',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
      }}
    >
      <AppBar position="static" color="inherit">
        <Toolbar 
          sx={{ 
            width: '85%', 
            height: '64px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            margin: '0 auto',
            padding: '0',
          }}
        >
          <img
            style={{ maxWidth: '220px', height: '40px' }} 
            srcSet={`src/components/Header/assets/LeftSide.svg`}
            src={`src/components/Header/assets/LeftSide.svg`}
            alt={'image-title'}
            loading="lazy"
          />
            <Box 
                sx={{ 
                    flexGrow: 1, 
                    display: 'flex', 
                    justifyContent: 'center' 
                }}>
                <Link color="inherit" href="#" underline="hover"
                    sx={{ 
                        fontSize: '16px', 
                        lineHeight: '150%', 
                        letterSpacing: '0.15px' 
                    }}
                >Запросы о помощи</Link>
            </Box>
            <Box 
                sx={{ 
                    width: '220px', 
                    height: '40px', 
                    display: 'flex', 
                    justifyContent: 'flex-end', 
                    alignItems: 'center' 
                }}
            > 
            {isUserLogged ? <ImageAvatar/> : <LogInButton/>}
            </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
