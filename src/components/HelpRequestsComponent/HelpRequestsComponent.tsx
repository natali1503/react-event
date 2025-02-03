import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { HelpRequest } from '../../types/HelpRequest';
import ViewToggle from '../ViewToggle/ViewToggle';

import { useViewMode } from '../../hooks/useViewMode';

import { ViewHelpRequests } from '../ViewHelpRequests';

type RequestsProps = {
  helpRequests: HelpRequest[];
  isHelpRequestsError: boolean;
  isFavouriteRequestsError?: boolean;
  noSearchResult: boolean;
  isLoading: boolean;
  isResetFilters: boolean;
  setIsResetFilters: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  customItemsPerPage?: number;
};

const HelpRequestsComponent: FC<RequestsProps> = ({
  helpRequests,
  noSearchResult,
  isHelpRequestsError,
  isLoading,
  isResetFilters,
  setIsResetFilters,
  isFavouriteRequestsError,
  currentPage,
  setCurrentPage,
  customItemsPerPage
}) => {
  const { viewMode, handleViewChange } = useViewMode();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Найдено: {helpRequests.length}</Typography>
        <ViewToggle viewMode={viewMode} onOptionChange={handleViewChange} />
      </Box>
      <ViewHelpRequests
        viewMode={viewMode}
        helpRequests={helpRequests}
        isHelpRequestsError={isHelpRequestsError}
        isLoading={isLoading}
        notFoundResult={noSearchResult}
        isResetFilters={isResetFilters}
        setIsResetFilters={setIsResetFilters}
        isFavouriteRequestsError={isFavouriteRequestsError}
        customItemsPerPage={customItemsPerPage}
        setCurrentPage={setCurrentPage}
      />
    </Box>
  );
};

export default HelpRequestsComponent;