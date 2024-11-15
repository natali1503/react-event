import { Box, Typography, Pagination } from '@mui/material';
import { FC, useCallback, useState } from 'react';
import CardList from '../CardList/CardList';
import { HelpRequest } from '../../types/HelpRequest';
import MapWrapper from '../Map/MapWrapper';
import ViewToggle from '../ViewToggle/ViewToggle';

type RequestsProps = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  helpRequests: HelpRequest[];
};

const HelpRequestsComponent: FC<RequestsProps> = ({currentPage, setCurrentPage, helpRequests}) => {
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
 
  return (
    <>
        <Box sx={{
          display: 'flex',       
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography variant="h6">Найдено: {helpRequests.length}</Typography>
          <ViewToggle onOptionChange={handleViewChange} />
        </Box>
        <Box>
          {viewMode === 'map' ? (
            <MapWrapper
              helpRequests={helpRequests}
            />
          ) : (
          <>
            <CardList helpRequests={ currentItems } viewMode={viewMode}/>
            <Box sx={{
              display: 'flex',       
              justifyContent: 'center',
              marginTop: '20px',
            }}>
              <Pagination
                count={Math.ceil(helpRequests.length / itemsPerPage)}
                page={currentPage}
                size='large'
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </>
          )}
        </Box>
      </>
   )
};

export default HelpRequestsComponent;

