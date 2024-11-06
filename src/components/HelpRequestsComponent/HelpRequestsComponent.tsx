import { Box, Typography, ToggleButtonGroup, Pagination, ToggleButton } from '@mui/material';
import { FC, useState } from 'react';
import CardList from '../CardList/CardList';
import GridOnIcon from '@mui/icons-material/GridOn';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { HelpRequest } from '../../types/HelpRequest';
import MapWrapper from '../Map/MapWrapper';

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

  const children = [
    <ToggleButton value="grid" key="grid">
      <GridOnIcon />
    </ToggleButton>,
    <ToggleButton value="list" key="list">
      <ListAltRoundedIcon />
    </ToggleButton>,
    <ToggleButton value="map" key="map">
      <LocationOnIcon /> 
    </ToggleButton>,
  ];

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newViewMode: string) => {
    setViewMode(newViewMode);
  };

  const control = {
    value: viewMode,
    onChange: handleViewChange,
    exclusive: true,
  };
  
   return (
      <>
        <Box sx={{
          display: 'flex',       
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <Typography variant="h6">Найдено: {helpRequests.length}</Typography>
          <ToggleButtonGroup size="small" {...control} aria-label="Small sizes">
            {children}
          </ToggleButtonGroup>
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

