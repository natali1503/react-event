import { useEffect, useState } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { fetchHelpRequestsAction, getUser } from '../store/api-actions';
import { useSelector } from 'react-redux';
import { getHelpRequests, getRequestDataError } from '../store/help-requests/selectors';
import { setHelpRequest, setIsLoading } from '../store/user-favourites/userFavourites';

export function useUserHelpRequests() {
  const dispatch = useAppDispatch();
  const helpRequestList = useSelector(getHelpRequests);
  const helpRequestDataError = useSelector(getRequestDataError)
  const [hasHelpRequests, setHasHelpRequests] = useState(
    helpRequestList.length > 0
  );

  useEffect(() => {
    if (helpRequestList.length === 0) {
      dispatch(getUser());
    }
  }, []);

  useEffect(() => {
    if (helpRequestList.length > 0) {
      dispatch(setHelpRequest(helpRequestList));
    } else {
      dispatch(setIsLoading());
      dispatch(fetchHelpRequestsAction());
      dispatch(setIsLoading());
    }
  }, [helpRequestList.length]);

  useEffect(() => {
    if (helpRequestDataError) dispatch(setIsLoading());
  }, [helpRequestDataError]);

  useEffect(() => {
    setHasHelpRequests(helpRequestList.length > 0);
  }, [helpRequestList]);

  return { helpRequestList, hasHelpRequests };
};
