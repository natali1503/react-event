import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getHelpRequests } from '../../store/help-requests/selectors';
import HelpRequestsComponent from '../HelpRequestsComponent/HelpRequestsComponent';
import { fetchHelpRequestsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';

export default function Favorites() {
  const helpRequestList = useAppSelector(getHelpRequests);
  const dispatch = useAppDispatch();

  useEffect(()=> {
    dispatch(fetchHelpRequestsAction());
  }, []);

  return (
    <>
      <HelpRequestsComponent helpRequests={helpRequestList}/>
    </>
  );
}
