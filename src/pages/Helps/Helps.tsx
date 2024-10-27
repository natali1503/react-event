// components
import Filters from '../../components/Filters';
import Search from '../../components/Search';
// styles
import { Box, Typography, Grid2 } from '@mui/material';
import { useEffect } from 'react';
import { getHelpRequests } from '../../store/help-requests/selectors';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchHelpRequestsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import HelpRequestsComponent from '../../components/HelpRequestsComponent/HelpRequestsComponent';


const Helps = () => {
  const helpRequestList = useAppSelector(getHelpRequests);
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(fetchHelpRequestsAction());
  }, []);

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
          <HelpRequestsComponent helpRequests={helpRequestList}/>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  )
}

export default Helps