import { useEffect, useState } from 'react';

import { fetchHelpRequestsAction, getFavouritesAction } from '../store/apiActions';
import { getHelpRequests, getIsRequestLoading, getRequestDataError } from '../store/helpRequests/helpRequestsSelectors';
import { setHelpRequest } from '../store/userFavourites/userFavouritesSlice';
import { getFavouriteLoadedFlag, getFavouriteRequestsError } from '../store/userFavourites/userFavouritesSelectors';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';

export function useUserHelpRequests() {
  const dispatch = useAppDispatch();
  const helpRequestsList = useAppSelector(getHelpRequests);
  const favouriteRequestsFlag = useAppSelector(getFavouriteLoadedFlag);
  const [hasHelpRequests, setHasHelpRequests] = useState(helpRequestsList.length > 0);
  const isHelpRequestsLoading = useAppSelector(getIsRequestLoading);
  const isHelpRequestsError = useAppSelector(getRequestDataError);
  const isFavouriteRequestsError = useAppSelector(getFavouriteRequestsError);

  // get favourite IDs list and profileData
  useEffect(() => {
    const fetchData = async () => {
      try {
        const helpRequestsResult = await dispatch(fetchHelpRequestsAction()).unwrap();
        if (helpRequestsResult.length > 0) {
          dispatch(setHelpRequest(helpRequestsResult));
          setHasHelpRequests(true);
          if (!favouriteRequestsFlag) {
            await dispatch(getFavouritesAction()).unwrap();
          }
        } else {
          setHasHelpRequests(false);
        }
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return { helpRequestsList, hasHelpRequests, isHelpRequestsLoading, isHelpRequestsError, isFavouriteRequestsError };
}
