// components
import Filters from '../../components/Filters';
import Search from '../../components/Search';
// styles
import { Box, Typography, Grid2 } from '@mui/material';


const Helps = () => {
  return (
    <Box>
      <Typography variant="h4">
        Запросы о помощи
      </Typography>
      <Grid2 container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }} sx={{mt: "1rem"}}>
        <Filters/>
        <Grid2 container size={{ xs: 2, sm: 4, md: 'grow' }} flexDirection={{ xs: 'column' }}>
          <Search/>
          <Grid2 sx={{backgroundColor: "white", padding: "2rem"}}>
            <Box>
              Search Result...
            </Box>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default Helps