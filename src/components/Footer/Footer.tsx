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
            height: '64px', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            margin: '0 auto',
        }}>
            <Link href="/" underline="hover" sx={{ color: 'black', '&:hover': { color: 'black' } }}>Об ивенте</Link>
            <Link href="/" underline="hover" sx={{ color: 'black', '&:hover': { color: 'black' } }}>Github проекта</Link>
            <Link href="/" underline="hover" sx={{ color: 'black', '&:hover': { color: 'black' } }}>Чат для джунов</Link>
        </Box>
    </Box>
  );
}