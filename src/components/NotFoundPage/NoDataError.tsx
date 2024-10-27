import { Box } from '@mui/material';

export default function ShowNoDataError() {
    return(
    <Box
      sx={{
        display: 'flex',               
        justifyContent: 'center',      
        alignItems: 'center',        
      }}
    >
      <img 
        srcSet={'public/img/noDataError.png'}
        src={'public/img/noDataError.png'}
        alt="Centered"
        style={{
          maxWidth: '100%',            
          maxHeight: '100%',          
        }}
      />
    </Box>
    )
}