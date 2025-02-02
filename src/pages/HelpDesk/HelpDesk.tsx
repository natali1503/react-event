import React, { useState } from 'react';
// components
import Filters from '../../components/Filters/Filters';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import HelpRequestsComponent from '../../components/HelpRequestsComponent/HelpRequestsComponent';
// styles
import { useMode } from '../../theme';
import { Box, Typography, Grid2, Paper } from '@mui/material';
// hooks
import { useUserHelpRequests } from '../../hooks/useUserHelpRequests';
import { useFilters } from '../../hooks/useFilters';

const HelpDesk: React.FC = () => {
  const { helpRequestsList, hasHelpRequests, isHelpRequestsLoading, isHelpRequestsError, isFavouriteRequestsError } = useUserHelpRequests();

  const { searchTerm, selectedOptions, filteredData, setSearchTerm, setSelectedOptions } = useFilters({
    helpRequestsList,
  });
  const [isResetFilters, setIsResetFilters] = useState(false);
  const [theme] = useMode();

  const dataToDisplay = filteredData ? filteredData : helpRequestsList;
  const noSearchResult = hasHelpRequests && filteredData.length === 0;

  const renderHelpRequestsComponent = () => {
    return (
      <HelpRequestsComponent
        helpRequests={dataToDisplay}
        isHelpRequestsError={isHelpRequestsError}
        noSearchResult={noSearchResult}
        isLoading={isHelpRequestsLoading}
        isResetFilters={isResetFilters}
        setIsResetFilters={setIsResetFilters}
        isFavouriteRequestsError={isFavouriteRequestsError}
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
          <Filters
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            setIsResetFilters={setIsResetFilters}
          />
          <Grid2 container size={'grow'} flexDirection={'column'} gap={2}>
            <SearchPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Paper sx={{ minHeight: 'calc(57.35rem - 14.1rem - 1.6rem)', padding: '2rem 3rem' }}>
              {renderHelpRequestsComponent()}
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
    </Paper>
  );
};

export default HelpDesk;
