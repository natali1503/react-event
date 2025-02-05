import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { HelpRequest } from '../../types/HelpRequest';
import ViewToggle from '../ViewToggle/ViewToggle';

import { useViewMode } from '../../hooks/useViewMode';

import { ViewHelpRequests } from '../ViewHelpRequests';

type RequestsProps = {
  helpRequests: HelpRequest[];
  customItemsPerPage?: number;
  noSearchResult: boolean;
  setIsResetFilters: React.Dispatch<React.SetStateAction<boolean>>;
  isHelpRequestsError: boolean;
  isFavouriteRequestsError?: boolean;
  isLoading: boolean;
  isResetFilters: boolean;
};

const HelpRequestsComponent: FC<RequestsProps> = ({
  helpRequests,
  noSearchResult,
  isHelpRequestsError,
  isLoading,
  isResetFilters,
  setIsResetFilters,
  isFavouriteRequestsError,
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
        customItemsPerPage={customItemsPerPage}
        notFoundResult={noSearchResult}
        isHelpRequestsError={isHelpRequestsError}
        isLoading={isLoading}
        isResetFilters={isResetFilters}
        isFavouriteRequestsError={isFavouriteRequestsError}
        setIsResetFilters={setIsResetFilters}
      />
    </Box>
  );
};

export default HelpRequestsComponent;