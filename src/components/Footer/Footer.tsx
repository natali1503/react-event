import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

export default function BottomNavigationApp() {

  return (
    <Box position="fixed" bottom={0}
        sx={{ 
            width: '100vw',
            margin: '0 auto',
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',  
        }}>
        <Box sx={{ 
            width: '85%', 
            maxWidth: '1500px',
            height: '64px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            margin: '0 auto',
        }}>
            <Link href="/" 
                target="_blank" 
                underline="hover" 
                sx={{ 
                    color: 'black', '&:hover': { color: 'black' }, 
                    width:'122px' 
                }}>Об ивенте</Link>
            <Link 
                href="https://github.com/nat-davydova/charity_event_back_oct2024/tree/main" 
                
                underline="hover" 
                sx={{ 
                    color: 'black', 
                    '&:hover': { color: 'black' }, 
                    width:'122px' 
                }}
            >Github проекта</Link>
            <Link 
                href="https://t.me/natti_jun_front" 
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