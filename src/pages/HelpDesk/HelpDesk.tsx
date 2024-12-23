import React, { useState } from 'react';
// components
import Filters from '../../components/Filters/Filters';
import SearchPanel from '../../components/SearchPanel/SearchPanel';
import HelpRequestsComponent from '../../components/HelpRequestsComponent/HelpRequestsComponent';
import FilterButton from '../../components/Filters/FilterButton';
// styles
import { useMode } from '../../theme';
import { Box, Typography, Grid2, CircularProgress, Paper} from '@mui/material';
// hooks
import { useUserHelpRequests } from '../../hooks/useUserHelpRequests';
import { useFilters } from '../../hooks/useFilters';
import ModalWindow from '../../components/ModalWindow/ModalWindow';

const HelpDesk: React.FC = () => {
  const { 
    helpRequestsList,
    hasHelpRequests,
    isHelpRequestsLoading,
    isHelpRequestsError
  } = useUserHelpRequests();

  const {
    searchTerm,
    selectedOptions,
    currentPage,
    filteredData,
    setSearchTerm,
    setSelectedOptions,
    setCurrentPage
  } = useFilters({ helpRequestsList });

  const [openFilterModal, setOpenFilterModal] = useState(false);
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

  const handleOpenFilterModal = () => {
    setOpenFilterModal(true);
  };

  const handleCloseFilterModal = () => {
    setOpenFilterModal(false);
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
          <Box sx={{
            display: 'block',
            '@media (max-width: 1560px)': {
              display: 'none',
            },
            '@media (min-width: 1561px)': {
              display: 'block',
            },
          }}>
            <Filters 
              selectedOptions={selectedOptions} 
              setSelectedOptions={setSelectedOptions} 
            />
          </Box>
          <Grid2 container size={'grow'} flexDirection={'column'} gap={2}>
            <Grid2 container gap={1}>
              <Box display={'flex'} flexGrow={1}>
                <SearchPanel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
              </Box>
              <Box sx={{
                width: 'fitContent',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                '@media (max-width: 1560px)': {
                  display: 'flex',
                },
                '@media (min-width: 1561px)': {
                  display: 'none',
                },
              }}>
                <FilterButton onClick={handleOpenFilterModal}/>
              </Box>
            </Grid2>
            <Paper sx={{width: '100%', minHeight: 'calc(57.35rem - 14.1rem - 1.6rem)', padding: '2rem 3rem'}}>
              {renderHelpRequestsComponent()}
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
      <ModalWindow
        openFilterModal={openFilterModal}
        handleCloseFilterModal={handleCloseFilterModal}
        slideDirection={'left'}
      >
        <Filters
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </ModalWindow>
    </Paper>
  );
};

export default HelpDesk;