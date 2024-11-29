import React from 'react';
// components
import Filters from '../../components/Filters/Filters';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import HelpRequestsComponent from '../../components/HelpRequestsComponent/HelpRequestsComponent';
import { NotFoundResult } from '../../components/NotFoundResult';
import { ErrorComponent } from '../../components/Error';
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
              {isHelpRequestsError && <ErrorComponent />}

              {isHelpRequestsLoading && (
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  <CircularProgress />
                </Box>
              )}
              {!hasHelpRequests && !isHelpRequestsLoading && !isHelpRequestsError && <NotFoundResult />}
              {hasHelpRequests && (
                <HelpRequestsComponent
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  helpRequests={filteredData ? filteredData : helpRequestsList}
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
