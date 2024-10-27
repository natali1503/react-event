import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getHelpRequests } from '../../store/help-requests/selectors';
import HelpRequestsComponent from '../HelpRequestsComponent/HelpRequestsComponent';
import { fetchHelpRequestsAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Box, CircularProgress } from '@mui/material';

export default function Favorites() {
  const helpRequestList = useAppSelector(getHelpRequests);
  const dispatch = useAppDispatch();
  const [isData, setIsData] = useState(helpRequestList.length);

  useEffect(() => {
    dispatch(fetchHelpRequestsAction());
    setIsData(helpRequestList.length);
  }, []);

  return (
    <>
      {!isData ? (
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <CircularProgress />
        </Box>
      ) : (
        <HelpRequestsComponent helpRequests={helpRequestList} />
      )}
    </>
  );
}
