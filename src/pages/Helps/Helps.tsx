import React from 'react';
// components
import Filters from '../../components/Filters/Filters';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import HelpRequestsComponent from '../../components/HelpRequestsComponent/HelpRequestsComponent';
// styles
import { useMode } from '../../theme';
import { Box, Typography, Grid2, CircularProgress, Paper } from '@mui/material';
// hooks
import { useUserHelpRequests } from '../../hooks/useUserHelpRequests';
import { useFilters } from '../../hooks/useFilters';

const Helps: React.FC = () => {
  const { helpRequestsList, hasHelpRequests, isHelpRequestsLoading, isHelpRequestsError } = useUserHelpRequests();

  const {
    searchTerm,
    selectedOptions,
    currentPage,
    filteredData,
    setSearchTerm,
    setSelectedOptions,
    setCurrentPage
  } = useFilters({ helpRequestsList });

  const [theme] = useMode();

  const dataToDisplay = filteredData ? filteredData : helpRequestsList;
  const noSearchResult = hasHelpRequests && filteredData.length === 0;

  const renderHelpRequestsComponent = () => {
    if (isHelpRequestsLoading) {
      return (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <CircularProgress />
        </Box>
      );
    }

    return (
      <HelpRequestsComponent
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        helpRequests={dataToDisplay}
        isHelpRequestsError={isHelpRequestsError}
        noSearchResult={noSearchResult}
      />
    );
  };

  return (
    <Paper
      sx={{
        padding: '3rem 4rem',
        background: theme.palette.background.default,
        width: '100%',
      }}
    >
      <Box>
        <Typography variant="h4">Запросы о помощи</Typography>
        <Grid2 container columnSpacing={3} mt={'1.2rem'}>
          <Filters selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
          <Grid2 container size={'grow'} flexDirection={'column'} gap={2}>
            <SearchPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Paper sx={{padding: '2rem 3rem'}}>
              {renderHelpRequestsComponent()}
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  );
};

export default Helps;
