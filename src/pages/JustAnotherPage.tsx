import { useEffect, useState } from 'react';
import CardList from '../components/CardList/CardList';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchHelpRequestsAction } from '../store/api-actions';
import { useAppSelector } from '../hooks/useAppSelector';
import { getHelpRequests } from '../store/help-requests/selectors';
import { Box, Pagination, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const JustAnotherPage = () => {
  const helpRequestList = useAppSelector(getHelpRequests);
  const dispatch = useAppDispatch();
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const [viewMode, setViewMode] = useState('grid');


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = helpRequestList.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(()=> {
    dispatch(fetchHelpRequestsAction());
  }, []);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newViewMode: string) => {
    setViewMode(newViewMode);
  };

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
          marginBottom: '20px'
        }}>
        <Typography variant="h6">Найдено: {helpRequestList.length}</Typography>
        <ToggleButtonGroup size="small" {...control} aria-label="Small sizes">
          {children}
        </ToggleButtonGroup>
      </Box>
      <CardList helpRequests={ currentItems } viewMode={viewMode}/>
      <Box sx={{
          display: 'flex',       
          justifyContent: 'center',
          marginTop: '20px'
        }}>
        <Pagination
        count={Math.ceil(helpRequestList.length / itemsPerPage)}
        page={currentPage}
        size='large'
        onChange={handlePageChange}
        color="primary"
      />
      </Box>
    </>
  );
}

export default JustAnotherPage;
