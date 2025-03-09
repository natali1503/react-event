import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { fetchHelpRequestsAction, getFavouritesAction } from '../store/api-actions';
import { getHelpRequests, getIsRequestLoading, getRequestDataError } from '../store/help-requests/selectors';
import { setHelpRequest } from '../store/user-favourites/userFavourites';
import { getFavouriteLoadedFlag, getFavouriteRequestsError } from '../store/user-favourites/favourites-selectors';

import { useAppDispatch } from './useAppDispatch';

export function useUserHelpRequests() {
  const dispatch = useAppDispatch();
  const helpRequestsList = useSelector(getHelpRequests);
  const favouriteRequestsFlag = useSelector(getFavouriteLoadedFlag);
  const [hasHelpRequests, setHasHelpRequests] = useState(helpRequestsList.length > 0);
  const isHelpRequestsLoading = useSelector(getIsRequestLoading);
  const isHelpRequestsError = useSelector(getRequestDataError);
  const isFavouriteRequestsError = useSelector(getFavouriteRequestsError);

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
