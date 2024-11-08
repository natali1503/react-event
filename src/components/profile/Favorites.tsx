import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks/useAppSelector';
import { getHelpRequests } from '../../store/help-requests/selectors';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { Box, CircularProgress } from '@mui/material';
import { getUserFavourites } from '../../store/userFavourites';

export default function Favorites() {
  const helpRequestList = useAppSelector(getHelpRequests);
  const dispatch = useAppDispatch();
  const [isData, setIsData] = useState(helpRequestList.length);

  useEffect(() => {
    dispatch(getUserFavourites());
    console.log(123);
  }, []);

  return <Box></Box>;
}
