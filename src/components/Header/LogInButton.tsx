import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom'

export default function LogInButton() {
    return (
        <Box 
            sx={{ 
                width: '220px', 
                height: '40px', 
                display: 'flex', 
                justifyContent: 'flex-end', 
                alignItems: 'center' 
            }}
        > 
            <Button  
                variant="outlined" 
                color="inherit" 
                sx={{ width: '122px', height: '40px' }}
                component={Link}
                to="/login" 
            >ВОЙТИ &gt;
            </Button>
        </Box>
    )
}