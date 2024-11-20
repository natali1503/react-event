import React from 'react';
// components
import Filters from '../../components/Filters/Filters';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import HelpRequestsComponent from '../../components/HelpRequestsComponent/HelpRequestsComponent';
// styles
import { Box, Typography, Grid2, CircularProgress, Paper } from '@mui/material';
// hooks
import { useUserHelpRequests } from '../../hooks/useUserHelpRequests';
import { useFilters } from '../../hooks/useFilters';

const Helps: React.FC = () => {
  const { helpRequestList, hasHelpRequests } = useUserHelpRequests();

  const {
    searchTerm,
    selectedOptions,
    currentPage,
    filteredData,
    setSearchTerm,
    setSelectedOptions,
    setCurrentPage
  } = useFilters({ helpRequestList });

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
