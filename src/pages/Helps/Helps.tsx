import React, { useEffect, useState } from 'react';
// data
import { getHelpRequests } from '../../store/help-requests/selectors';
import { fetchHelpRequestsAction, getFavouritesAction } from '../../store/api-actions';
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
import { useMode } from '../../theme';
import { Error } from '../../components/Error';
import { useSelector } from 'react-redux';
import { NotFoundResult } from '../../components/NotFoundResult';
import { RootState } from '../../store/types';

const Helps: React.FC = () => {
  const helpRequestList = useAppSelector(getHelpRequests);
  const dispatch = useAppDispatch();
  const [theme] = useMode();
  const helpRequest = useSelector((state: RootState) => {
    return state['HELP_REQUEST'];
  });
  const isFavouriteRequests = useSelector((state: RootState) => {
    return state.favourites.isFavouriteRequests;
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<HelpRequest[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const isLoading = helpRequest.isRequestsDataLoading;
  const isError = helpRequest.hasError;
  const isHelpRequests = helpRequestList.length > 0;

  useEffect(() => {
    if (helpRequestList.length === 0) dispatch(fetchHelpRequestsAction());
  }, []);

  useEffect(() => {
    if (!isFavouriteRequests) dispatch(getFavouritesAction());
  }, []);

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
    <Paper
      sx={{
        padding: '30px 40px',
        background: theme.palette.background.default,
        width: '100%',
      }}
    >
      <Box>
        <Typography variant="h4">Запросы о помощи</Typography>
        <Grid2 container rowSpacing={1} columnSpacing={3} mt={'1rem'}>
          <Filters selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
          <Grid2 container size={'grow'} flexDirection={'column'} gap={2}>
            <SearchPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Paper sx={{ backgroundColor: 'white', padding: '2rem' }}>
              {isError && <Error />}

              {isLoading && (
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  <CircularProgress />
                </Box>
              )}
              {!isHelpRequests && !isLoading && !isError && <NotFoundResult />}
              {isHelpRequests && (
                <HelpRequestsComponent
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  helpRequests={filteredData ? filteredData : helpRequestList}
                />
              )}
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  );
};

export default Helps;
