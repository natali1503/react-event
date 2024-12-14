import { useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { fetchHelpRequestsAction, getUser } from '../store/api-actions';
import { useSelector } from 'react-redux';
import { getHelpRequests, getIsRequestLoading, getRequestDataError } from '../store/help-requests/selectors';
import { setHelpRequest } from '../store/user-favourites/userFavourites';

export function useUserHelpRequests() {
  const dispatch = useAppDispatch();
  const helpRequestsList = useSelector(getHelpRequests);
  const [hasHelpRequests, setHasHelpRequests] = useState(helpRequestsList.length > 0);
  const isHelpRequestsLoading = useSelector(getIsRequestLoading);
  const isHelpRequestsError = useSelector(getRequestDataError)

  useEffect(() => {
    if (helpRequestsList.length > 0) {
      dispatch(setHelpRequest(helpRequestsList));
    } else {
      dispatch(fetchHelpRequestsAction());
    }
  }, [helpRequestsList.length]);

  // get favourite IDs list and profileData
  useEffect(() => {
    dispatch(getUser());
  }, [helpRequestsList.length]);

  useEffect(() => {
    setHasHelpRequests(helpRequestsList.length > 0);
  }, [helpRequestsList]);

  return { helpRequestsList, hasHelpRequests, isHelpRequestsLoading, isHelpRequestsError };
};
