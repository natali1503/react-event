import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchHelpRequestsAction } from '../store/api-actions';
import { useAppSelector } from '../hooks/useAppSelector';
import { getHelpRequests } from '../store/help-requests/selectors';
import HelpRequestsComponent from '../components/HelpRequestsComponent/HelpRequestsComponent';


const JustAnotherPage = () => {
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

export default JustAnotherPage;
