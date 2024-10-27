import { Box } from '@mui/material';

export default function NoFoundData() {
    return(
    <Box
      sx={{
        display: 'flex',               
        justifyContent: 'center',     
        alignItems: 'center',          
      }}
    >
      <img 
        srcSet={'/img/noFoundData.png'}
        src={'/img/noFoundData.png'}
        alt="Centered"
        style={{
          maxWidth: '100%',            
          maxHeight: '100%',           
        }}
      />
    </Box>
    )
}