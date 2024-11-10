import React, { useEffect, useState } from 'react';
// data
import { getHelpRequests } from '../../store/help-requests/selectors';
import { fetchHelpRequestsAction, getUser } from '../../store/api-actions';
// hooks
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
// components
import Filters from '../../components/Filters/Filters';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import HelpRequestsComponent from '../../components/HelpRequestsComponent/HelpRequestsComponent';
// utils
import { applyFilter, applySearch } from '../../utils/filterUtils';
// types
import { HelpRequest } from '../../types/HelpRequest';
// styles
import { Box, Typography, Grid2, CircularProgress, Paper } from '@mui/material';

const Helps: React.FC = () => {
  const helpRequestList = useAppSelector(getHelpRequests);
  const dispatch = useAppDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<HelpRequest[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasHelpRequests, setHasHelpRequests] = useState(
    helpRequestList.length > 0
  );

  useEffect(() => {
    if (helpRequestList.length === 0) {
      dispatch(getUser());
      dispatch(fetchHelpRequestsAction())
    };
  }, []);

  useEffect(() => {
    setHasHelpRequests(helpRequestList.length > 0);
  }, [helpRequestList]);

  useEffect(() => {
    const filterHelpRequests = () => {
      if (!helpRequestList || helpRequestList.length === 0) {
        setFilteredData([]);
        return;
      }

      let requestedData = helpRequestList;

      if (searchTerm) {
        requestedData = applySearch(requestedData, searchTerm);
      }

      if (selectedOptions.length > 0) {
        requestedData = applyFilter(requestedData, selectedOptions);
      }

      setCurrentPage(1);
      setFilteredData(requestedData);
    };
    filterHelpRequests();
  }, [helpRequestList, searchTerm, selectedOptions]);

  return (
    <Paper sx={{ padding: '30px 40px', background: '#F5F5F5' }}>
      {!hasHelpRequests ? (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <CircularProgress />
        </Box>
      ) : (
        <Box>
          <Typography variant="h4">Запросы о помощи</Typography>
          <Grid2 container rowSpacing={1} columnSpacing={3} mt={'1rem'}>
            <Filters
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
            <Grid2 container size={'grow'} flexDirection={'column'} gap={2}>
              <SearchPanel
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              <Paper sx={{ backgroundColor: 'white', padding: '2rem' }}>
                <HelpRequestsComponent
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  helpRequests={filteredData ? filteredData : helpRequestList}
                />
              </Paper>
            </Grid2>
          </Grid2>
        </Box>
      )}
    </Paper>
  );
};

export default Helps;
