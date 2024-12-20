import { FC, useEffect, useRef } from 'react';
import { HelpRequest } from '../../types/HelpRequest';
import CardItem from '../CardItem/CardItem';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';

type RequestsProps = {
  helpRequests: HelpRequest[];
  viewMode: string;
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>> ;
};

const CardList: FC<RequestsProps> = (requests) => {
  const { helpRequests, viewMode, totalPages, currentPage, setCurrentPage } = requests;

  const listRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number>(0);

  // Make sure the currentPage stays within bounds when totalPages updates
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage, setCurrentPage]);

  const handleWheel = (e: WheelEvent) => {
    // Prevent page scroll when scrolling inside the CardList component
    e.preventDefault();

    if (e.deltaY > 0) {
      if (currentPage < totalPages) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    } else {
      if (currentPage > 1) {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Prevent going below page 1
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const swipeThreshold = 50;

    if (touchStartRef.current - touchEnd > swipeThreshold && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
    if (touchEnd - touchStartRef.current > swipeThreshold && currentPage > 1) {
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1)); // Prevent going below page 1
    }
  };

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (listElement) {
        listElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, [currentPage]);

  return (
    <Box
      ref={listRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Grid
        container
        spacing={viewMode === 'grid' ? 2 : 0}
        direction={viewMode === 'list' ? 'column' : 'row'}
        justifyContent={'center'}
      >
        {helpRequests.map((request) => {
          const keyValue = request.id;
          return (
            <CardItem
              key={keyValue}
              keyValue={keyValue}
              helpRequest={request}
              orientation={viewMode === 'grid' ? 'vertical' : 'horizontal'}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

export default CardList;