import { Box, Typography, Pagination } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import CardList from '../CardList/CardList';
import { HelpRequest } from '../../types/HelpRequest';
import MapWrapper from '../Map/MapWrapper';
import ViewToggle from '../ViewToggle/ViewToggle';
import { ErrorComponent } from '../Error';
import { NotFoundResult } from '../NotFoundResult';

type RequestsProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  helpRequests: HelpRequest[];
  isHelpRequestsError?: boolean;
  noSearchResult? : boolean;
};

const HelpRequestsComponent: FC<RequestsProps> = ({currentPage, setCurrentPage, helpRequests, noSearchResult, isHelpRequestsError}) => {
  const [viewMode, setViewMode] = useState('grid');
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = helpRequests.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleViewChange = useCallback((newViewMode: string) => {
    setViewMode(newViewMode);
  }, []);

  const renderErrorMessage = () => {
    if (isHelpRequestsError) {
      return <ErrorComponent/>
    }

    if (noSearchResult) {
      return <NotFoundResult />;
    }

    return null; 
  };

  const errorMessage = renderErrorMessage();

  return (
    <Box>
      <Box sx={{
        display: 'flex',       
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography variant="h6">Найдено: {helpRequests.length}</Typography>
        <ViewToggle onOptionChange={handleViewChange} />
      </Box>
      <Box>
        {errorMessage}
        {errorMessage === null && (
          <>
            {viewMode === 'map' ? (
              <MapWrapper helpRequests={helpRequests}/>
            ) : (
              <Box>
                <CardList helpRequests={currentItems} viewMode={viewMode} />
                <Box sx={{
                  display: 'flex',       
                  justifyContent: 'center',
                  marginTop: '30px'
                }}>
                  <Pagination
                    count={Math.ceil(helpRequests.length / itemsPerPage)}
                    page={currentPage}
                    size='large'
                    onChange={handlePageChange}
                    color="primary"
                  />
                </Box>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
   )
};

export default HelpRequestsComponent;

