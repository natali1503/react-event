import { FC, useEffect, useRef, useState } from 'react';
import { HelpRequest } from '../../types/HelpRequest';
import CardItem from '../CardItem/CardItem';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import './swipeAnimations.css';

type RequestsProps = {
  helpRequests: HelpRequest[];
  viewMode: string;
  totalPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

const CardList: FC<RequestsProps> = (requests) => {
  const { helpRequests, viewMode, totalPages, currentPage, setCurrentPage } = requests;

  const [animationState, setAnimationState] = useState<'enter' | 'exit' | 'none'>('none');
  const listRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<number>(0);

  // Make sure the currentPage stays within bounds when totalPages updates
  useEffect(() => {
    if (!totalPages) return;
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage, setCurrentPage]);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    if (e.deltaY > 0 && currentPage < totalPages) {
      setAnimationState('exit');
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (e.deltaY < 0 && currentPage > 1) {
      setAnimationState('exit');
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const swipeThreshold = 50;

    if (touchStartRef.current - touchEnd > swipeThreshold && currentPage < totalPages) {
      setAnimationState('exit');
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (touchEnd - touchStartRef.current > swipeThreshold && currentPage > 1) {
      setAnimationState('exit');
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
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

  useEffect(() => {
    if (animationState === 'exit') {
      setAnimationState('enter');
    }
  }, [helpRequests, animationState]);

  return (
    <Box display={'flex'} justifyContent={'center'} width={'100%'}>
      <Grid
        container
        className={animationState === 'exit' ? 'card-exit' : animationState === 'enter' ? 'card-enter' : ''}
        width={viewMode === 'grid' ? 'fitContent' : '100%'}
        spacing={viewMode === 'grid' ? 2 : 0}
        direction={viewMode === 'list' ? 'column' : 'row'}
        ref={listRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
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
