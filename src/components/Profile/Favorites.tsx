import { useEffect, useState } from 'react';
import { Box, Skeleton } from '@mui/material';
import { useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../store/types';
import { Error } from '../Error';
import { useDispatch } from 'react-redux';
import {
  setHelpRequest,
  setFavouriteHelp,
  setIsLoading,
} from '../../store/userFavourites';
import { matchFavourites } from '../../features/matchFavourites';
import HelpRequestsComponent from '../HelpRequestsComponent/HelpRequestsComponent';
import { fetchHelpRequestsAction } from '../../store/api-actions';
import { NotFoundResult } from '../NotFoundResult';
export default function Favorites() {
  const [currentFavPage, setCurrentFavPage] = useState<number>(1);

  const userFavourites = useSelector((state: RootState) => {
    return state.favourites;
  });

  const helpRequestData = useSelector((state: RootState) => {
    return state.HELP_REQUEST.helpRequestsList;
  });

  const helpRequestDataError = useSelector((state: RootState) => {
    return state.HELP_REQUEST.hasError;
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (helpRequestData.length > 0) {
      dispatch(setHelpRequest(helpRequestData));
    } else {
      dispatch(setIsLoading());
      dispatch(fetchHelpRequestsAction());
    }
  }, [helpRequestData.length]);

  useEffect(() => {
    if (userFavourites.helpRequest.length === 0) return;

    const favouriteHelp = matchFavourites(
      userFavourites.helpRequest,
      userFavourites.favouriteRequests
    );
    dispatch(setFavouriteHelp(favouriteHelp));
  }, [userFavourites.helpRequest, userFavourites.favouriteRequests]);

  useEffect(() => {
    if (helpRequestDataError) dispatch(setIsLoading());
  }, [helpRequestDataError]);
  const notFoundResult =
    userFavourites.isData && userFavourites.favouriteRequests.length === 0;
  return (
    <Box marginTop={'20px'}>
      {helpRequestDataError && <Error />}
      {notFoundResult && <NotFoundResult />}
      {userFavourites.isLoading && (
        <Skeleton width={'100px'} height={'100px'} />
      )}
      {userFavourites.favouriteHelp.length > 0 && (
        <HelpRequestsComponent
          currentPage={currentFavPage}
          setCurrentPage={setCurrentFavPage}
          helpRequests={userFavourites.favouriteHelp}
        />
      )}
    </Box>
  );
}
