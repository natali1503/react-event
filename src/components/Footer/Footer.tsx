import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function BottomNavigationApp() {
  return (
    <Box bottom={0}
        sx={{ 
            height: '152px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: '0 210px',
        }}>
        <Box sx={{ 
            width: '100%', 
            height: '64px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            margin: '0 auto',
        }}>
            <Link href="https://t.me/natti_jun_front/239" 
                target="_blank" 
                underline="hover" 
                sx={{ 
                    color: 'black', '&:hover': { color: 'black' }, 
                    width:'122px' 
                }}>Об ивенте</Link>
            <Link 
                href="https://github.com/heyhurricane/react-event" 
                target="_blank"
                underline="hover" 
                sx={{ 
                    color: 'black', 
                    '&:hover': { color: 'black' }, 
                    width:'122px' 
                }}
            >Github проекта</Link>
            <Link 
                href="https://t.me/pixels_and_feather" 
                target="_blank" 
                underline="hover" 
                sx={{ 
                    color: 'black', 
                    '&:hover': { color: 'black' }, 
                    width:'122px' 
                }}
            >Чат для джунов</Link>
        </Box>
    </Box>
  );
}
