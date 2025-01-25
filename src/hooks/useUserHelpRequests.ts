import { useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { fetchHelpRequestsAction, getFavouritesAction } from '../store/api-actions';
import { useSelector } from 'react-redux';
import { getHelpRequests, getIsRequestLoading, getRequestDataError } from '../store/help-requests/selectors';
import { setHelpRequest, setIsLoading } from '../store/user-favourites/userFavourites';
import { getFavouriteLoadedFlag, getFavouriteRequestsError } from '../store/user-favourites/favourites-selectors';

export function useUserHelpRequests() {
  const dispatch = useAppDispatch();
  const helpRequestsList = useSelector(getHelpRequests);
  const favouriteRequestsFlag = useSelector(getFavouriteLoadedFlag);
  const [hasHelpRequests, setHasHelpRequests] = useState(helpRequestsList.length > 0);
  const isHelpRequestsLoading = useSelector(getIsRequestLoading);
  const isHelpRequestsError = useSelector(getRequestDataError)
  const isFavouriteRequestsError = useSelector(getFavouriteRequestsError)
  useEffect(() => {
    if (!favouriteRequestsFlag) {
      dispatch(getFavouritesAction());
    }
  }, []);

  useEffect(() => {
    if (helpRequestsList.length > 0) {
      dispatch(setHelpRequest(helpRequestsList));
    } else {
      dispatch(setIsLoading());
      dispatch(fetchHelpRequestsAction());
      dispatch(setIsLoading());
    }
  }, [helpRequestsList.length]);

  useEffect(() => {
    if (isHelpRequestsError) dispatch(setIsLoading());
  }, [isHelpRequestsError]);

  useEffect(() => {
    setHasHelpRequests(helpRequestsList.length > 0);
  }, [helpRequestsList]);

  return { helpRequestsList, hasHelpRequests, isHelpRequestsLoading, isHelpRequestsError, isFavouriteRequestsError };
};
