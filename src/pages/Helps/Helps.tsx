// components
import Filters from '../../components/Filters';
import Search from '../../components/Search';
// styles
import { Box, Typography, Grid2, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { getHelpRequests } from '../../store/help-requests/selectors';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchHelpRequestsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import HelpRequestsComponent from '../../components/HelpRequestsComponent/HelpRequestsComponent';
import { HelpRequest } from '../../types/HelpRequest';


const Helps = () => {
  const helpRequestList = useAppSelector(getHelpRequests);
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<HelpRequest[]>([]);
  const [isData, setIsData] = useState(helpRequestList.length);

  useEffect(() => {
    dispatch(fetchHelpRequestsAction());
  }, []);

  useEffect(() => {
    setIsData(helpRequestList.length);
  }, [helpRequestList]);

  useEffect(() => {
    const filterHelpRequests = () => {
      let data = helpRequestList;

      // Filter by search term
      if (searchTerm) {
        data = data.filter(request =>
          request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          request.organization.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by selected options
      if (selectedOptions.length > 0) {
        data = data.filter(request => {
          const matchesRequesterType = selectedOptions.includes(request.requesterType);
          const matchesHelpType = selectedOptions.includes(request.helpType);
          const matchesHelperType = selectedOptions.includes(request.helperRequirements.helperType);
          const matchesOnline = selectedOptions.includes(`${request.helperRequirements.isOnline}`);
          const matchesQualification = selectedOptions.includes(request.helperRequirements.qualification);

          // Check if any of the filters match
          return matchesRequesterType || matchesHelpType || matchesHelperType || matchesOnline || matchesQualification;
        });
      }

      setFilteredData(data);
    };
    console.log(selectedOptions);


    filterHelpRequests();
    console.log(filteredData)
  }, [helpRequestList, searchTerm, selectedOptions]);

  return (
    <>
      {!isData ? (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
      <Typography variant="h4">
        Запросы о помощи
      </Typography>
      <Grid2 container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }} sx={{mt: '1 rem'}}>
        <Filters 
          selectedOptions={selectedOptions} 
          setSelectedOptions={setSelectedOptions} 
        />
        <Grid2 container size={{ xs: 2, sm: 4, md: 'grow' }} flexDirection={{ xs: 'column' }}>
          <Search 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm} 
          />
          <Grid2 sx={{backgroundColor: 'white', padding: '2rem'}}>
            <HelpRequestsComponent helpRequests={filteredData? filteredData : helpRequestList}/>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
    )}
    </>
  )
}

export default Helps;
